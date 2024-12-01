document.addEventListener("DOMContentLoaded", function() {
    // Get the elements from the DOM
    const loginPage = document.getElementById('login-page');
    const registerPage = document.getElementById('register-page');
    const homePage = document.getElementById('home-page');
    const showRegisterLink = document.getElementById('show-register');
    const showLoginLink = document.getElementById('show-login');
    const backButton = document.getElementById('back-btn');
    const sendButton = document.getElementById('send-btn');
    const userInput = document.getElementById('user-input');
    const chatMessages = document.getElementById('chat-messages');

    // Show the registration page when the "Register" link is clicked
    showRegisterLink.addEventListener('click', function(event) {
        event.preventDefault();
        loginPage.classList.remove('active');
        registerPage.classList.add('active');
    });

    // Show the login page when the "Login" link is clicked
    showLoginLink.addEventListener('click', function(event) {
        event.preventDefault();
        registerPage.classList.remove('active');
        loginPage.classList.add('active');
    });

    // Show the home page when login is successful
    document.getElementById('login-form').addEventListener('submit', function(event) {
        event.preventDefault();
        loginPage.classList.remove('active');
        homePage.classList.add('active');
    });

    // Show the home page when register is successful
    document.getElementById('register-form').addEventListener('submit', function(event) {
        event.preventDefault();
        registerPage.classList.remove('active');
        homePage.classList.add('active');
    });

    // Back button to go back to the login page
    backButton.addEventListener('click', function() {
        homePage.classList.remove('active');
        loginPage.classList.add('active');
    });

    // Chatbot functionality to handle user input and give responses
    sendButton.addEventListener('click', function() {
        const userMessage = userInput.value.trim();
        if (userMessage === '') return;  // Ignore empty input

        // Display the user's message in the chat
        appendMessage('user', userMessage);

        // Generate the bot's response with a delay to simulate typing
        setTimeout(function() {
            const botResponse = getBotResponse(userMessage);
            appendMessage('bot', botResponse);
        }, 1000); // Simulate a 1-second delay for response
       
        // Clear the input field
        userInput.value = '';
        userInput.focus();
    });

    // Function to append messages to the chat
    function appendMessage(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
        messageElement.textContent = message;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;  // Auto-scroll to the latest message
    }

    // Function to generate the bot's response based on the user's input
    function getBotResponse(userMessage) {
        const lowerCaseMessage = userMessage.toLowerCase();

        // Simple greetings or casual responses
        if (lowerCaseMessage.includes('hi') || lowerCaseMessage.includes('hello')) {
            return "Hello! How are you feeling today?";
        } else if (lowerCaseMessage.includes('how are you') || lowerCaseMessage.includes('how are you doing')) {
            return "I'm just a bot, but I'm doing great! How about you?";
        } else if (lowerCaseMessage.includes('good') || lowerCaseMessage.includes('fine') || lowerCaseMessage.includes('great')) {
            return "Glad to hear you're doing well! How can I assist you today?";
        } else if (lowerCaseMessage.includes('thank you') || lowerCaseMessage.includes('thanks')) {
            return "You're welcome! Let me know if you need anything else.";
        } else if (lowerCaseMessage.includes('bye') || lowerCaseMessage.includes('goodbye')) {
            return "Goodbye! Take care and feel free to reach out anytime.";
        }

        // Basic responses based on common symptoms or keywords
        const responseMap = {
            'fever': [
                "It seems like you might have a fever. Please monitor your temperature and stay hydrated. If symptoms persist, consult a doctor.",
                "Fever can be caused by infections, dehydration, or other conditions. Drink plenty of fluids and get some rest.",
                "Make sure to take some fever-reducing medicine if needed, and stay hydrated. If the fever lasts more than 3 days, contact a healthcare professional."
            ],
            'headache': [
                "Headaches can be caused by various factors. Try to rest, drink water, and avoid screen time. If it continues, consider seeing a doctor.",
                "A headache might be a sign of dehydration or stress. Drink water and take a break. If it gets worse, consult a healthcare provider.",
                "Try taking a short break from screens, rest, and drink some water. If the headache continues, it might be worth visiting a doctor."
            ],
            'cough': [
                "A cough can be a sign of a cold or flu. Try to rest and stay hydrated. If symptoms worsen, please consult a healthcare professional.",
                "Persistent coughing can sometimes indicate allergies or respiratory issues. Rest, hydrate, and seek medical advice if it doesn't improve.",
                "Coughing can be uncomfortable. Make sure you're keeping hydrated, and if it lasts for more than a week, please see a doctor."
            ],
            'cold': [
                "Cold symptoms usually include a runny nose, sore throat, and cough. Rest and hydration are important. If it lasts too long, consult a doctor.",
                "Common cold symptoms can make you feel run down, but it's typically self-limiting. Drink fluids, rest, and take OTC medication for relief.",
                "If you have a cold, make sure to get enough rest, eat healthy foods, and stay hydrated. If symptoms don't improve in a week, visit your doctor."
            ],
            'tired': [
                "Feeling tired might indicate a need for rest or could be due to stress. Make sure you are sleeping well, eating properly, and staying hydrated.",
                "Fatigue can be caused by a variety of factors. Check your sleep schedule, nutrition, and stress levels. If you feel constantly tired, consult a doctor.",
                "Rest is crucial for recovery. If you're feeling tired all the time, it could be a sign of something more serious like anemia or sleep apnea. Please consult a healthcare professional."
            ]
        };

        // Match user message to keywords and return a random response from predefined set
        for (const symptom in responseMap) {
            if (lowerCaseMessage.includes(symptom)) {
                const responses = responseMap[symptom];
                return responses[Math.floor(Math.random() * responses.length)];
            }
        }

        // Default response if no symptoms are matched
        return "I'm not sure what that could be. Please provide more details about your symptoms.";
    }
});
