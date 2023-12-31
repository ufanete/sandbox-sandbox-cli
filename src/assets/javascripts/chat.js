/**
 * 
 * @param {*} user 
 */
const chatapp = function (user, messages) {
    user.username = user.firstname;
    var FADE_TIME = 150; // ms
    var TYPING_TIMER_LENGTH = 400; // ms
    var COLORS = [
        'blue', 'indigo', 'purple', 'pink',
        'red', 'orange', 'yellow', 'green',
        'teal', 'cyan'
    ];

    const uuid = () => {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    };

    // Initialize variables
    var $window = $(window);
    var $usernameInput = $('.usernameInput'); // Input for username
    var $messages = $('.messages'); // Messages area
    var $inputMessage = $('.inputMessage'); // Input message input box

    // Prompt for setting a username
    var username;
    var userId = "";
    var connected = false;
    var typing = false;
    var lastTypingTime;
    var $currentInput = $usernameInput.focus();

    var socket = io();

    const addParticipantsMessage = (data) => {
        var message = '';
        if (data.numUsers === 1) {
            message += "there's 1 participant (You)";
        } else {
            message += "there are " + data.numUsers + " participants";
        }
        log(message);
    }

    // Sets the client's username
    const setUsername = ($username) => {

        username = cleanInput($username || $('.usernameInput').val().trim());
        // If the username is valid
        if (username) {
            userId = user._id;
            $currentInput = $inputMessage.focus();

            // Tell the server your username
            socket.emit('add user', user);
            return true;
        } else {
            return false;
        }
    }

    // Sends a chat message
    const sendMessage = () => {
        var message = $inputMessage.val();
        // Prevent markup from being injected into the message
        message = cleanInput(message);
        // if there is a non-empty message and a socket connection
        if (message && connected) {
            $inputMessage.val('');
            addChatMessage({
                username: username,
                userId: userId,
                message: message,
                timestamp: new Date()
            });
            // tell server to execute 'new message' and send along one parameter
            socket.emit('new message', message);
        }
    }

    // Log a message
    const log = (message, options) => {
        var $el = $('<div>').addClass('log').text(message);
        addMessageElement($el, options);
    }

    // Adds the visual chat message to the message list
    const addChatMessage = (data, options) => {
        var $typingMessages = getTypingMessages(data);
        options = options || {};
        if ($typingMessages.length !== 0) {
            options.fade = false;
            $typingMessages.remove();
        }

        var $messageDiv;
        if (data.typing) {
            var $usernameDiv = $('<span class="username"/>')
                .text(data.username)
                .addClass(getUsernameColor(data.username));
            var $messageBodyDiv = $('<span class="messageBody">')
                .text(data.message);

            $messageDiv = $('<section/>')
                .data('username', data.username)
                .addClass('typing')
                .addClass('log')
                .append($usernameDiv, $messageBodyDiv);


        } else {

            var isRecievedMessage = data.userId.toString() != userId.toString();
            $messageDiv = $('.message-template').clone();
            // set the message div alignment
            $messageDiv.removeClass('message-template')
                .data('username', data.username)
                .removeClass('d-none')
                .addClass('log')
                .addClass(isRecievedMessage ? 'align-self-start text-start' : 'align-self-end text-end');
            // set the message bubble color
            $messageDiv.find('.message-bubble')
                .addClass(isRecievedMessage ? 'bg-secondary text-muted' : 'bg-primary');
            // Set the message
            $messageDiv.find('.message-text').text(data.message);
            // set the username
            $messageDiv.find('.message-name').text(data.username)
                .addClass(getUsernameColor(data.username));
            $messageDiv.attr('title', data.timestamp.toString());
        }

        addMessageElement($messageDiv, options);
    }

    // Adds the visual chat typing message
    const addChatTyping = (data) => {
        data.typing = true;
        data.message = 'is typing';
        addChatMessage(data);
    }

    // Removes the visual chat typing message
    const removeChatTyping = (data) => {
        getTypingMessages(data).fadeOut(function () {
            $(this).remove();
        });
    }

    // Adds a message element to the messages and scrolls to the bottom
    // el - The element to add as a message
    // options.fade - If the element should fade-in (default = true)
    // options.prepend - If the element should prepend
    //   all other messages (default = false)
    const addMessageElement = (el, options) => {
        var $el = $(el);

        // Setup default options
        if (!options) {
            options = {};
        }
        if (typeof options.fade === 'undefined') {
            options.fade = true;
        }
        if (typeof options.prepend === 'undefined') {
            options.prepend = false;
        }

        // Apply options
        if (options.fade) {
            $el.hide().fadeIn(FADE_TIME);
        }
        if (options.prepend) {
            $messages.prepend($el);
        } else {
            $messages.append($el);
        }
        $messages[0].scrollTop = $messages[0].scrollHeight;
    }

    // Prevents input from having injected markup
    const cleanInput = (input) => {
        return $('<div/>').text(input).html();
    }

    // Updates the typing event
    const updateTyping = () => {
        if (connected) {
            if (!typing) {
                typing = true;
                socket.emit('typing');
            }
            lastTypingTime = (new Date()).getTime();

            setTimeout(() => {
                var typingTimer = (new Date()).getTime();
                var timeDiff = typingTimer - lastTypingTime;
                if (timeDiff >= TYPING_TIMER_LENGTH && typing) {
                    socket.emit('stop typing');
                    typing = false;
                }
            }, TYPING_TIMER_LENGTH);
        }
    }

    // Gets the 'X is typing' messages of a user
    const getTypingMessages = (data) => {
        return $('.typing.message').filter(function (i) {
            return $(this).data('username') === data.username;
        });
    }

    // Gets the color of a username through our hash function
    const getUsernameColor = (username) => {
        // Compute hash code
        var hash = 7;
        for (var i = 0; i < username.length; i++) {
            hash = username.charCodeAt(i) + (hash << 5) - hash;
        }
        // Calculate color
        var index = Math.abs(hash % COLORS.length);
        return `text-${COLORS[index]}`;
    }

    // Keyboard events

    $window.keydown(event => {
        // Auto-focus the current input when a key is typed
        if (!(event.ctrlKey || event.metaKey || event.altKey)) {
            $currentInput.focus();
        }
        // When the client hits ENTER on their keyboard
        if (event.which === 13) {
            if (username) {
                sendMessage();
                socket.emit('stop typing');
                typing = false;
            } else {
                setUsername();
            }
        }
    });

    $inputMessage.on('input', () => {
        updateTyping();
    });

    // Click events
    // Focus input when clicking on the message input's border
    $inputMessage.click(() => {
        $inputMessage.focus();
    });

    // Socket events

    // Whenever the server emits 'login', log the login message
    socket.on('login', (data) => {
        connected = true;
        // Display the welcome message
        var message = "Welcome to Socket.IO Chat – ";
        log(message, {
            prepend: true
        });
        addParticipantsMessage(data);
    });

    // Whenever the server emits 'new message', update the chat body
    socket.on('new message', (data) => {
        addChatMessage(data);
    });

    // Whenever the server emits 'user joined', log it in the chat body
    socket.on('user joined', (data) => {
        log(data.username + ' joined');
        addParticipantsMessage(data);
    });

    // Whenever the server emits 'user left', log it in the chat body
    socket.on('user left', (data) => {
        log(data.username + ' left');
        addParticipantsMessage(data);
        removeChatTyping(data);
    });

    // Whenever the server emits 'typing', show the typing message
    socket.on('typing', (data) => {
        addChatTyping(data);
    });

    // Whenever the server emits 'stop typing', kill the typing message
    socket.on('stop typing', (data) => {
        removeChatTyping(data);
    });

    socket.on('disconnect', () => {
        log('you have been disconnected');
    });

    socket.on('reconnect', () => {
        log('you have been reconnected');
        if (user) {
            socket.emit('add user', user);
        }
    });

    socket.on('reconnect_error', () => {
        log('attempt to reconnect has failed');
    });

    socket.on("connect", () => {
        var isInit = setUsername(user?.firstname);

        if (isInit && messages) {
            messages.forEach(element => {
                try {

                    let data = {
                        username: element.username[0],
                        message: element.message,
                        userId: element.userId,
                        timestamp: new Date(element.timestamp)
                    };
                    addChatMessage(data);
                } catch (e) {
                    console.dir(e)
                }
            });
        }

    });

};

/*
        old template
        
            var $messageDiv = $('<li class="message"/>')
            .data('username', data.username)
            .addClass(typingClass)
            .append($usernameDiv, $messageBodyDiv);

        */

/*
new template
 
var $messageDiv = $('.message-template').clone();
messageDiv.removeClass('message-template')
.removeClass('d-none')
.addClass('log')
.find('.message-text').text(message)
*/

/*
not working first attempt
var $messageDiv = $('.message-template').clone();
$messageDiv.removeClass('message-template')
.removeClass('d-none')
.addClass('log')
.data('username', data.username)
.addClass(typingClass)
.append($usernameDiv, $messageBodyDiv);
*/