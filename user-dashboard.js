function logout() {
    if (confirm('Are you sure you want to logout?')) {
        window.location.href = 'index.html';
    }
}

// Dummy database for books
const bookDatabase = {
    fiction: [
        { id: "F001", title: "The Great Gatsby", author: "F. Scott Fitzgerald", category: "fiction", isbn: "978-0743273565", available: true, rating: 4.5 },
        { id: "F002", title: "To Kill a Mockingbird", author: "Harper Lee", category: "fiction", isbn: "978-0446310789", available: true, rating: 4.8 },
        { id: "F003", title: "1984", author: "George Orwell", category: "fiction", isbn: "978-0451524935", available: false, rating: 4.7 }
    ],
    nonFiction: [
        { id: "NF001", title: "Sapiens: A Brief History of Humankind", author: "Yuval Noah Harari", category: "non-fiction", isbn: "978-0062316097", available: true, rating: 4.6 },
        { id: "NF002", title: "The Selfish Gene", author: "Richard Dawkins", category: "non-fiction", isbn: "978-0192860927", available: true, rating: 4.4 }
    ],
    textbooks: [
        { id: "TB001", title: "Introduction to Computer Science", author: "John Smith", category: "textbooks", isbn: "978-0123456789", available: true, rating: 4.2 },
        { id: "TB002", title: "Data Structures and Algorithms", author: "Jane Wilson", category: "textbooks", isbn: "978-0987654321", available: false, rating: 4.5 }
    ],
    reference: [
        { id: "R001", title: "The Oxford Dictionary", author: "Oxford University Press", category: "reference", isbn: "978-0198611868", available: true, rating: 4.9 },
        { id: "R002", title: "Encyclopedia Britannica", author: "Britannica Editorial", category: "reference", isbn: "978-1593392923", available: true, rating: 4.7 }
    ]
};

// Function to search books
function searchBooks(query, category = 'all') {
    query = query.toLowerCase();
    let results = [];

    if (category === 'all') {
        Object.values(bookDatabase).forEach(categoryBooks => {
            results = results.concat(
                categoryBooks.filter(book => 
                    book.title.toLowerCase().includes(query) ||
                    book.author.toLowerCase().includes(query) ||
                    book.isbn.includes(query)
                )
            );
        });
    } else {
        const categoryKey = category.toLowerCase().replace('-', '');
        if (bookDatabase[categoryKey]) {
            results = bookDatabase[categoryKey].filter(book =>
                book.title.toLowerCase().includes(query) ||
                book.author.toLowerCase().includes(query) ||
                book.isbn.includes(query)
            );
        }
    }

    return results;
}

// Function to display search results
function displaySearchResults(results) {
    const searchSection = document.querySelector('.search-section');
    let resultsHTML = '';

    if (results.length === 0) {
        resultsHTML = '<p class="no-results">No books found matching your search.</p>';
    } else {
        resultsHTML = `
            <div class="search-results">
                <div class="results-header">
                    <h3>Search Results (${results.length} found)</h3>
                    <button class="close-results-btn">✖ Close</button>
                </div>
                <div class="results-grid">
                    ${results.map(book => `
                        <div class="book-card">
                            <h4>${book.title}</h4>
                            <p>By ${book.author}</p>
                            <p>ISBN: ${book.isbn}</p>
                            <p>Category: ${book.category}</p>
                            <p>Rating: ${book.rating} ⭐</p>
                            <p class="availability ${book.available ? 'available' : 'unavailable'}">
                                ${book.available ? 'Available' : 'Currently Borrowed'}
                            </p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    let resultsSection = searchSection.querySelector('.search-results');
    if (!resultsSection) {
        resultsSection = document.createElement('div');
        resultsSection.className = 'search-results';
        searchSection.appendChild(resultsSection);
    }
    resultsSection.innerHTML = resultsHTML;

    const closeBtn = resultsSection.querySelector('.close-results-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', clearSearchResults);
    }
}

// Function to clear search results
function clearSearchResults() {
    const searchSection = document.querySelector('.search-section');
    const resultsSection = searchSection.querySelector('.search-results');
    if (resultsSection) {
        resultsSection.remove();
    }
}

// Add styles for search results
const style = document.createElement('style');
style.textContent = `
    .search-results {
        margin-top: 2rem;
        padding-top: 2rem;
        border-top: 1px solid #eee;
    }
    .results-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
    }
    .results-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 1.5rem;
        margin-top: 1rem;
    }
    .book-card {
        background: #f8f9fa;
        padding: 1.5rem;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        transition: transform 0.3s;
    }
    .book-card:hover {
        transform: translateY(-5px);
    }
    .book-card h4 {
        color: #2c3e50;
        margin-bottom: 0.5rem;
    }
    .book-card p {
        color: #666;
        font-size: 0.9rem;
        margin-bottom: 0.5rem;
    }
    .availability {
        font-weight: 500;
    }
    .available {
        color: #2e7d32;
    }
    .unavailable {
        color: #c62828;
    }
    .no-results {
        text-align: center;
        color: #666;
        padding: 2rem;
        background: #f8f9fa;
        border-radius: 8px;
    }
    .close-results-btn {
        background: #e74c3c;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s;
    }
    .close-results-btn:hover {
        background: #c0392b;
    }
`;
document.head.appendChild(style);

// Update search functionality
document.querySelector('.search-btn').addEventListener('click', function() {
    const searchTerm = document.querySelector('.search-input').value;
    const activeCategory = document.querySelector('.filter-btn.active').textContent.toLowerCase();
    
    if (searchTerm.trim()) {
        const results = searchBooks(searchTerm, activeCategory);
        displaySearchResults(results);
    }
});

// Update filter functionality
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        const searchTerm = document.querySelector('.search-input').value;
        if (searchTerm.trim()) {
            const results = searchBooks(searchTerm, this.textContent.toLowerCase());
            displaySearchResults(results);
        }
    });
});

// Add search on Enter key
document.querySelector('.search-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        const searchTerm = this.value;
        const activeCategory = document.querySelector('.filter-btn.active').textContent.toLowerCase();
        
        if (searchTerm.trim()) {
            const results = searchBooks(searchTerm, activeCategory);
            displaySearchResults(results);
        }
    }
});

// Chatbot functionality
document.addEventListener('DOMContentLoaded', function() {
    const chatbotWidget = document.getElementById('chatbotWidget');
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatInput = document.getElementById('chatInput');

    chatbotToggle.addEventListener('click', function() {
        chatbotWidget.classList.add('show');
        chatInput.focus();
    });

    chatbotClose.addEventListener('click', function(e) {
        e.stopPropagation();
        chatbotWidget.classList.remove('show');
    });

    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && this.value.trim()) {
            sendMessage();
        }
    });
});

function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');
    const message = chatInput.value.trim();

    if (message) {
        addMessage(message, 'user');
        chatInput.value = '';

        setTimeout(() => {
            const botResponse = getBotResponse(message);
            addMessage(botResponse, 'bot');
        }, 1000);
    }
}

function addMessage(text, type) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getBotResponse(message) {
    const responses = {
        'hello': 'Hi there! How can I help you today?',
        'book': 'We have a wide selection of books. What topic are you interested in?',
        'help': 'I can help you find books, check due dates, or answer questions about our services.',
        'bye': 'Goodbye! Feel free to come back if you need more help!'
    };

    message = message.toLowerCase();
    for (let key in responses) {
        if (message.includes(key)) {
            return responses[key];
        }
    }
    return "I'm not sure about that. Would you like me to help you find a book or check your account status?";
}

// Notification functionality
document.addEventListener('DOMContentLoaded', function() {
    const notificationCenter = document.getElementById('notificationCenter');
    const notificationToggle = document.getElementById('notificationToggle');

    notificationToggle.addEventListener('click', function(e) {
        e.preventDefault();
        notificationCenter.classList.toggle('show');
    });

    document.addEventListener('click', function(e) {
        if (!notificationCenter.contains(e.target) && 
            !notificationToggle.contains(e.target) && 
            notificationCenter.classList.contains('show')) {
            notificationCenter.classList.remove('show');
        }
    });

    notificationCenter.addEventListener('click', function(e) {
        e.stopPropagation();
    });
});

// Goal Modal functionality
function showGoalModal() {
    const modal = document.getElementById('goalModal');
    modal.style.display = 'flex';
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('goalDeadline').min = today;
    window.scrollTo(0, 0);
}

function closeGoalModal() {
    document.getElementById('goalModal').style.display = 'none';
}

function submitGoal(event) {
    event.preventDefault();
    const formData = {
        type: document.getElementById('goalType').value,
        target: document.getElementById('goalTarget').value,
        deadline: document.getElementById('goalDeadline').value
    };

    const goalsList = document.querySelector('.goals-list');
    const newGoal = document.createElement('div');
    newGoal.className = 'goal-item';
    newGoal.innerHTML = `
        <h3>${formData.type.charAt(0).toUpperCase() + formData.type.slice(1)} Goal</h3>
        <div class="progress-bar">
            <div class="progress-fill" style="width: 0%"></div>
        </div>
        <p>0/${formData.target} ${formData.type}</p>
        <span class="reward-badge">🎯 New Goal</span>
    `;
    goalsList.appendChild(newGoal);

    closeGoalModal();
    alert('New goal has been set successfully!');
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('goalModal');
    if (event.target == modal) {
        closeGoalModal();
    }
}

// Dummy database for fines
const fines = {
    overdue: [
        { id: "F001", bookId: "TB002", amount: 5.00, reason: "Overdue by 2 days", status: "pending" },
        { id: "F002", bookId: "TB003", amount: 10.00, reason: "Overdue by 1 day", status: "pending" }
    ],
    total: 15.00
};

document.querySelector('.pay-fines-btn').addEventListener('click', function() {
    if (confirm(`Pay total fine of $${fines.total.toFixed(2)}?`)) {
        alert('Payment successful!');
        fines.overdue = [];
        fines.total = 0;
        updateFinesDisplay();
    }
});

function updateFinesDisplay() {
    const finesList = document.querySelector('.fines-list');
    const countElement = document.querySelector('.dashboard-card .count');
    
    if (fines.overdue.length === 0) {
        finesList.innerHTML = '<p>No pending fines</p><button class="pay-fines-btn" style="display: none;">Pay All Fines</button>';
        countElement.textContent = '$0.00';
    }
}