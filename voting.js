// Contract ABI (Application Binary Interface)
const votingContractABI = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_title",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_description",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "_startTime",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_endTime",
                "type": "uint256"
            },
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "description",
                        "type": "string"
                    }
                ],
                "internalType": "struct VotingSystem.Candidate[]",
                "name": "_candidates",
                "type": "tuple[]"
            },
            {
                "internalType": "address[]",
                "name": "_whitelist",
                "type": "address[]"
            },
            {
                "internalType": "bool",
                "name": "_isPublic",
                "type": "bool"
            }
        ],
        "name": "createElection",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_electionId",
                "type": "uint256"
            }
        ],
        "name": "getElection",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "title",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "description",
                        "type": "string"
                    },
                    {
                        "internalType": "address",
                        "name": "creator",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "startTime",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "endTime",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "isPublic",
                        "type": "bool"
                    },
                    {
                        "internalType": "uint256",
                        "name": "totalVotes",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct VotingSystem.Election",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getElectionCount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_electionId",
                "type": "uint256"
            }
        ],
        "name": "getCandidates",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "description",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "voteCount",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct VotingSystem.CandidateWithVotes[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_electionId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_candidateId",
                "type": "uint256"
            }
        ],
        "name": "vote",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_electionId",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "_voter",
                "type": "address"
            }
        ],
        "name": "hasVoted",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_electionId",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "_voter",
                "type": "address"
            }
        ],
        "name": "getVoterChoice",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_electionId",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "_voter",
                "type": "address"
            }
        ],
        "name": "canVote",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

// Contract address 
const CONTRACT_ADDRESS = '0x123456789012345678901234567890123456789'; // Replace with your deployed contract address

// Application state
let web3;
let votingContract;
let currentAccount;
let elections = [];
let currentElectionId;
let isConnected = false;

// DOM Elements
const connectWalletBtn = document.getElementById('connectWallet');
const accountInfoElement = document.getElementById('accountInfo');
const accountAddressElement = document.getElementById('accountAddress');
const accountBalanceElement = document.getElementById('accountBalance');
const networkIndicator = document.getElementById('networkIndicator');
const networkNameElement = document.getElementById('networkName');
const notificationsContainer = document.getElementById('notifications');
const activeElectionsContainer = document.getElementById('activeElections');
const pastElectionsContainer = document.getElementById('pastElections');
const votingHistoryContainer = document.getElementById('votingHistory');
const createElectionForm = document.getElementById('createElectionForm');
const addCandidateBtn = document.getElementById('addCandidateBtn');
const voterRestrictionSelect = document.getElementById('voterRestriction');
const whitelistSection = document.getElementById('whitelistSection');
const electionModal = document.getElementById('electionModal');
const closeModalBtn = document.querySelector('.close-modal');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

// Initialize the application
window.addEventListener('load', async () => {
    initEventListeners();
    await checkIfWeb3IsInstalled();
});

// Setup event listeners
function initEventListeners() {
    connectWalletBtn.addEventListener('click', connectWallet);
    createElectionForm.addEventListener('submit', handleCreateElection);
    addCandidateBtn.addEventListener('click', addCandidateInput);
    voterRestrictionSelect.addEventListener('change', toggleWhitelistSection);
    closeModalBtn.addEventListener('click', closeModal);
    
    // Tab switching
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.getAttribute('data-tab');
            switchTab(tabName);
        });
    });
}

// Check if Web3 is installed (MetaMask)
async function checkIfWeb3IsInstalled() {
    if (window.ethereum) {
        try {
            web3 = new Web3(window.ethereum);
            votingContract = new web3.eth.Contract(votingContractABI, CONTRACT_ADDRESS);
            
            // Listen for account changes
            window.ethereum.on('accountsChanged', handleAccountsChanged);
            window.ethereum.on('chainChanged', () => window.location.reload());
            
            // Try to connect automatically
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            if (accounts.length > 0) {
                handleAccountsChanged(accounts);
            } else {
                showNotification('Please connect your wallet to use the application.', 'info');
            }
        } catch (error) {
            console.error("Error initializing Web3:", error);
            showNotification('Failed to connect to the blockchain.', 'error');
        }
    } else {
        showNotification('Please install MetaMask to use this dApp!', 'warning');
    }
}

// Connect wallet
async function connectWallet() {
    try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        handleAccountsChanged(accounts);
    } catch (error) {
        console.error("Error connecting wallet:", error);
        showNotification('Failed to connect wallet. Please try again.', 'error');
    }
}

// Handle account changes
async function handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
        currentAccount = null;
        isConnected = false;
        updateUIOnDisconnect();
    } else if (accounts[0] !== currentAccount) {
        currentAccount = accounts[0];
        isConnected = true;
        updateUIOnConnect();
        await loadBlockchainData();
    }
}

// Update UI when connected
async function updateUIOnConnect() {
    connectWalletBtn.classList.add('hidden');
    accountInfoElement.classList.remove('hidden');
    
    // Format account address for display
    const formattedAddress = `${currentAccount.substring(0, 6)}...${currentAccount.substring(currentAccount.length - 4)}`;
    accountAddressElement.textContent = formattedAddress;
    
    // Get account balance
    const balance = await web3.eth.getBalance(currentAccount);
    const ethBalance = web3.utils.fromWei(balance, 'ether');
    accountBalanceElement.textContent = parseFloat(ethBalance).toFixed(4);
    
    // Update network status
    const networkId = await web3.eth.net.getId();
    let networkName;
    
    switch(networkId) {
        case 1:
            networkName = "Ethereum Mainnet";
            break;
        case 5:
            networkName = "Goerli Testnet";
            break;
        case 11155111:
            networkName = "Sepolia Testnet";
            break;
        case 137:
            networkName = "Polygon Mainnet";
            break;
        case 80001:
            networkName = "Mumbai Testnet";
            break;
        default:
            networkName = `Network #${networkId}`;
    }
    
    networkNameElement.textContent = networkName;
    networkIndicator.classList.add('connected');
}

// Update UI when disconnected
function updateUIOnDisconnect() {
    connectWalletBtn.classList.remove('hidden');
    accountInfoElement.classList.add('hidden');
    networkIndicator.classList.remove('connected');
    networkNameElement.textContent = "Not Connected";
    
    // Clear election data
    activeElectionsContainer.innerHTML = '<div class="no-data">Connect wallet to view elections</div>';
    pastElectionsContainer.innerHTML = '<div class="no-data">Connect wallet to view elections</div>';
    votingHistoryContainer.innerHTML = '<div class="no-data">Connect wallet to view voting history</div>';
}

// Load blockchain data
async function loadBlockchainData() {
    try {
        await loadElections();
        await loadVotingHistory();
    } catch (error) {
        console.error("Error loading blockchain data:", error);
        showNotification('Failed to load blockchain data. Please try again.', 'error');
    }
}

// Load elections from blockchain
async function loadElections() {
    showLoader(activeElectionsContainer);
    showLoader(pastElectionsContainer);
    
    try {
        const electionCount = await votingContract.methods.getElectionCount().call();
        elections = [];
        
        for (let i = 0; i < electionCount; i++) {
            const electionData = await votingContract.methods.getElection(i).call();
            const candidates = await votingContract.methods.getCandidates(i).call();
            
            elections.push({
                id: i,
                title: electionData.title,
                description: electionData.description,
                creator: electionData.creator,
                startTime: parseInt(electionData.startTime) * 1000, // Convert to milliseconds
                endTime: parseInt(electionData.endTime) * 1000, // Convert to milliseconds
                isPublic: electionData.isPublic,
                totalVotes: parseInt(electionData.totalVotes),
                candidates: candidates.map((candidate, index) => ({
                    id: index,
                    name: candidate.name,
                    description: candidate.description,
                    voteCount: parseInt(candidate.voteCount)
                }))
            });
        }
        
        displayElections();
    } catch (error) {
        console.error("Error loading elections:", error);
        showNotification('Failed to load elections from blockchain.', 'error');
        
        activeElectionsContainer.innerHTML = '<div class="no-data">Failed to load elections</div>';
        pastElectionsContainer.innerHTML = '<div class="no-data">Failed to load elections</div>';
    }
}

// Display elections in UI
function displayElections() {
    const now = new Date().getTime();
    const activeElections = elections.filter(e => e.startTime <= now && e.endTime >= now);
    const pastElections = elections.filter(e => e.endTime < now);
    
    if (activeElections.length === 0) {
        activeElectionsContainer.innerHTML = '<div class="no-data">No active elections found</div>';
    } else {
        activeElectionsContainer.innerHTML = '';
        activeElections.forEach(election => {
            activeElectionsContainer.appendChild(createElectionCard(election));
        });
    }
    
    if (pastElections.length === 0) {
        pastElectionsContainer.innerHTML = '<div class="no-data">No past elections found</div>';
    } else {
        pastElectionsContainer.innerHTML = '';
        pastElections.forEach(election => {
            pastElectionsContainer.appendChild(createElectionCard(election));
        });
    }
}

// Create election card element
function createElectionCard(election) {
    const card = document.createElement('div');
    card.className = 'election-card';
    card.dataset.id = election.id;
    
    const now = new Date().getTime();
    let statusClass, statusText;
    
    if (election.startTime > now) {
        statusClass = 'status-upcoming';
        statusText = 'Upcoming';
    } else if (election.endTime < now) {
        statusClass = 'status-ended';
        statusText = 'Ended';
    } else {
        statusClass = 'status-active';
        statusText = 'Active';
    }
    
    card.innerHTML = `
        <h3>${election.title}</h3>
        <p>${election.description.length > 100 ? election.description.substring(0, 100) + '...' : election.description}</p>
        <div class="election-meta">
            <div><strong>Start:</strong> ${formatDate(election.startTime)}</div>
            <div><strong>End:</strong> ${formatDate(election.endTime)}</div>
            <div><strong>Votes:</strong> ${election.totalVotes}</div>
        </div>
        <span class="status-badge ${statusClass}">${statusText}</span>
    `;
    
    card.addEventListener('click', () => openElectionDetails(election.id));
    
    return card;
}

// Load user's voting history
async function loadVotingHistory() {
    if (!currentAccount) return;
    
    showLoader(votingHistoryContainer);
    
    try {
        const votingHistory = [];
        
        for (let i = 0; i < elections.length; i++) {
            const hasVoted = await votingContract.methods.hasVoted(i, currentAccount).call();
            
            if (hasVoted) {
                const choiceId = await votingContract.methods.getVoterChoice(i, currentAccount).call();
                const election = elections[i];
                const candidateVotedFor = election.candidates[choiceId];
                
                votingHistory.push({
                    electionId: i,
                    electionTitle: election.title,
                    candidateId: parseInt(choiceId),
                    candidateName: candidateVotedFor ? candidateVotedFor.name : 'Unknown',
                    votedAt: 'N/A' // We don't store this in the contract for simplicity
                });
            }
        }
        
        displayVotingHistory(votingHistory);
    } catch (error) {
        console.error("Error loading voting history:", error);
        showNotification('Failed to load your voting history.', 'error');
        votingHistoryContainer.innerHTML = '<div class="no-data">Failed to load voting history</div>';
    }
}

// Display voting history in UI
function displayVotingHistory(history) {
    if (history.length === 0) {
        votingHistoryContainer.innerHTML = '<div class="no-data">You haven\'t voted in any elections yet</div>';
        return;
    }
    
    votingHistoryContainer.innerHTML = '';
    const historyList = document.createElement('div');
    historyList.className = 'history-list';
    
    history.forEach(vote => {
        const voteItem = document.createElement('div');
        voteItem.className = 'vote-history-item';
        voteItem.innerHTML = `
            <h4>${vote.electionTitle}</h4>
            <p><strong>Voted for:</strong> ${vote.candidateName}</p>
        `;
        
        voteItem.addEventListener('click', () => openElectionDetails(vote.electionId));
        historyList.appendChild(voteItem);
    });
    
    votingHistoryContainer.appendChild(historyList);
}

// Handle creating a new election
async function handleCreateElection(event) {
    event.preventDefault();
    
    if (!currentAccount) {
        showNotification('Please connect your wallet first.', 'warning');
        return;
    }
    
    try {
        const title = document.getElementById('electionTitle').value;
        const description = document.getElementById('electionDescription').value;
        const startDate = new Date(document.getElementById('startDate').value).getTime() / 1000; // Convert to seconds
        const endDate = new Date(document.getElementById('endDate').value).getTime() / 1000; // Convert to seconds
        
        // Validate dates
        if (startDate >= endDate) {
            showNotification('End date must be after start date.', 'warning');
            return;
        }
        
        if (startDate < (Date.now() / 1000)) {
            showNotification('Start date must be in the future.', 'warning');
            return;
        }
        
        // Get candidates
        const candidateInputs = document.querySelectorAll('.candidate-input');
        const candidates = [];
        
        for (const input of candidateInputs) {
            const name = input.querySelector('input[name="candidate"]').value;
            const desc = input.querySelector('input[name="candidateDesc"]').value;
            
            if (name.trim() === '') continue;
            
            candidates.push({
                name: name,
                description: desc
            });
        }
        
        if (candidates.length < 2) {
            showNotification('Add at least two candidates.', 'warning');
            return;
        }
        
        // Get whitelist if needed
        const isPublic = voterRestrictionSelect.value === 'public';
        let whitelist = [];
        
        if (!isPublic) {
            const whitelistText = document.getElementById('whitelistAddresses').value;
            if (whitelistText.trim() === '') {
                showNotification('Please add at least one address to the whitelist.', 'warning');
                return;
            }
            
            // Parse whitelist addresses
            whitelist = whitelistText.split('\n')
                .map(addr => addr.trim())
                .filter(addr => addr !== '' && web3.utils.isAddress(addr));
                
            if (whitelist.length === 0) {
                showNotification('No valid addresses found in whitelist.', 'warning');
                return;
            }
        }
        
        // Show loading notification
        showNotification('Creating election... Please confirm the transaction in your wallet.', 'info');
        
        // Call contract method
        const result = await votingContract.methods.createElection(
            title,
            description,
            Math.floor(startDate),
            Math.floor(endDate),
            candidates,
            whitelist,
            isPublic
        ).send({ from: currentAccount });
        
        showNotification('Election created successfully!', 'success');
        createElectionForm.reset();
        
        // Reload elections
        await loadElections();
        
        // Switch to elections tab
        switchTab('elections');
    } catch (error) {
        console.error("Error creating election:", error);
        showNotification('Failed to create election: ' + (error.message || 'Unknown error'), 'error');
    }
}

// Open election details modal
async function openElectionDetails(electionId) {
    currentElectionId = electionId;
    const election = elections.find(e => e.id == electionId);
    
    if (!election) {
        showNotification('Election not found.', 'error');
        return;
    }
    
    // Set modal content
    document.getElementById('modalElectionTitle').textContent = election.title;
    document.getElementById('modalElectionDescription').textContent = election.description;
    document.getElementById('modalStartDate').textContent = formatDate(election.startTime);
    document.getElementById('modalEndDate').textContent = formatDate(election.endTime);
    
    const now = new Date().getTime();
    let status;
    
    if (election.startTime > now) {
        status = '<span class="status-badge status-upcoming">Upcoming</span>';
    } else if (election.endTime < now) {
        status = '<span class="status-badge status-ended">Ended</span>';
    } else {
        status = '<span class="status-badge status-active">Active</span>';
    }
    
    document.getElementById('modalStatus').innerHTML = status;
    
    // Display candidates
    const candidatesListElement = document.getElementById('candidatesList');
    candidatesListElement.innerHTML = '';
    
    election.candidates.forEach(candidate => {
        const candidateItem = document.createElement('div');
        candidateItem.className = 'candidate-item';
        candidateItem.innerHTML = `
            <h4>${candidate.name}</h4>
            <p>${candidate.description}</p>
        `;
        candidatesListElement.appendChild(candidateItem);
    });
    
    // Check if user can vote
    const votingSection = document.getElementById('votingSection');
    const resultsSection = document.getElementById('resultsSection');
    
    // First hide both sections
    votingSection.classList.add('hidden');
    resultsSection.classList.add('hidden');
    
    // Determine what to show based on election status and user's voting status
    try {
        const canVote = await votingContract.methods.canVote(electionId, currentAccount).call();
        const hasVoted = await votingContract.methods.hasVoted(electionId, currentAccount).call();
        
        // If election is active and user can vote
        if (election.startTime <= now && election.endTime >= now && canVote && !hasVoted) {
            // Show voting section
            votingSection.classList.remove('hidden');
            
            // Display voting options
            const votingOptionsElement = document.getElementById('votingOptions');
            votingOptionsElement.innerHTML = '';
            
            election.candidates.forEach((candidate, index) => {
                const optionElement = document.createElement('div');
                optionElement.className = 'vote-option';
                optionElement.dataset.candidateId = index;
                optionElement.innerHTML = `
                    <input type="radio" name="vote" id="vote-${index}" value="${index}">
                    <label for="vote-${index}">
                        <strong>${candidate.name}</strong> - ${candidate.description}
                    </label>
                `;
                votingOptionsElement.appendChild(optionElement);
                
                // Add click event to select this option
                optionElement.addEventListener('click', () => {
                    document.querySelectorAll('.vote-option').forEach(opt => opt.classList.remove('selected'));
                    optionElement.classList.add('selected');
                    document.getElementById(`vote-${index}`).checked = true;
                });
            });
            
            // Setup vote button action
            const castVoteBtn = document.getElementById('castVoteBtn');
            castVoteBtn.onclick = () => castVote(electionId);
        }
        
        // Show results if the election has ended or the user has already voted
        if (election.endTime < now || hasVoted) {
            // Show results section
            resultsSection.classList.remove('hidden');
            displayElectionResults(election);
            
            // If user has voted, highlight their choice
            if (hasVoted) {
                const choice = await votingContract.methods.getVoterChoice(electionId, currentAccount).call();
                const choiceElement = document.querySelector(`.result-item[data-candidate-id="${choice}"]`);
                if (choiceElement) {
                    choiceElement.classList.add('user-voted');
                }
            }
        }
    } catch (error) {
        console.error("Error checking voting eligibility:", error);
    }
    
    // Show modal
    electionModal.style.display = 'block';
}

// Display election results
function displayElectionResults(election) {
    const resultsElement = document.getElementById('electionResults');
    resultsElement.innerHTML = '';
    
    // Calculate total votes (should be same as election.totalVotes but recalculating for safety)
    const totalVotes = election.candidates.reduce((sum, candidate) => sum + candidate.voteCount, 0);
    
    // Sort candidates by votes (descending)
    const sortedCandidates = [...election.candidates].sort((a, b) => b.voteCount - a.voteCount);
    
    sortedCandidates.forEach(candidate => {
        const percentage = totalVotes > 0 ? (candidate.voteCount / totalVotes * 100).toFixed(1) : 0;
        
        const resultItem = document.createElement('div');
        resultItem.className = 'result-item';
        resultItem.dataset.candidateId = candidate.id;
        
        resultItem.innerHTML = `
            <div class="result-header">
                <strong>${candidate.name}</strong>
                <span>${candidate.voteCount} votes (${percentage}%)</span>
            </div>
            <div class="result-bar">
                <div class="result-fill" style="width: ${percentage}%">${percentage}%</div>
            </div>
        `;
        
        resultsElement.appendChild(resultItem);
    });
}

// Cast a vote
async function castVote(electionId) {
    const selectedOption = document.querySelector('.vote-option.selected');
    
    if (!selectedOption) {
        showNotification('Please select a candidate to vote for.', 'warning');
        return;
    }
    
    const candidateId = selectedOption.dataset.candidateId;
    
    try {
        showNotification('Casting your vote... Please confirm the transaction in your wallet.', 'info');
        
        await votingContract.methods.vote(electionId, candidateId)
            .send({ from: currentAccount });
        
        showNotification('Your vote has been successfully recorded!', 'success');
        
        // Reload election data
        await loadElections();
        await loadVotingHistory();
        
        // Reload modal content
        openElectionDetails(electionId);
    } catch (error) {
        console.error("Error casting vote:", error);
        showNotification('Failed to cast vote: ' + (error.message || 'Unknown error'), 'error');
    }
}

// Add candidate input field
function addCandidateInput() {
    const candidateInputs = document.getElementById('candidateInputs');
    const newInput = document.createElement('div');
    newInput.className = 'candidate-input';
    newInput.innerHTML = `
        <input type="text" name="candidate" placeholder="Candidate name" required>
        <input type="text" name="candidateDesc" placeholder="Brief description" required>
    `;
    candidateInputs.appendChild(newInput);
}

// Toggle whitelist section based on selection
function toggleWhitelistSection() {
    if (voterRestrictionSelect.value === 'whitelist') {
        whitelistSection.classList.remove('hidden');
    } else {
        whitelistSection.classList.add('hidden');
    }
}

// Close modal
function closeModal() {
    electionModal.style.display = 'none';
}

// Switch tabs
function switchTab(tabName) {
    // Update tab buttons
    tabButtons.forEach(button => {
        if (button.getAttribute('data-tab') === tabName) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
    
    // Update tab contents
    tabContents.forEach(content => {
        if (content.id === tabName) {
            content.classList.add('active');
        } else {
            content.classList.remove('active');
        }
    });
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notificationsContainer.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 5000);
}

// Show loader
function showLoader(container) {
    container.innerHTML = '<div class="loader">Loading...</div>';
}

// Format date
function formatDate(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Window click to close modal when clicking outside
window.onclick = function(event) {
    if (event.target === electionModal) {
        closeModal();
    }
};