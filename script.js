let initiativeArray = [];

// Function to roll a d20 for initiative
function rollInitiative() {
    return Math.floor(Math.random() * 20) + 1;
}

// Function to add a single initiative
function addInitiative() {
    const name = document.getElementById("name").value.trim();
    const manualInitiative = parseInt(document.getElementById("manual-initiative").value);
    const modifier = parseInt(document.getElementById("modifier").value);
    let initiative;

    if (!name) {
        alert("Please enter a name.");
        return;
    }

    if (modifier && manualInitiative) {
        alert("You cannot have both a modifier and a manual initiative.");
        return;
    }

    if (modifier) {
        initiative = rollInitiative() + modifier;
    } else {
        initiative = manualInitiative;
    }

    if (isNaN(initiative)) {
        alert("Please enter a valid initiative.");
        return;
    }

    initiativeArray.push({ name, initiative });

    updateInitiativeList();

    // Clear input fields
    document.getElementById("name").value = "";
    document.getElementById("manual-initiative").value = "";
    document.getElementById("modifier").value = "";
}

// Function to add multiple initiatives
function addMultiInitiative() {
    const name = document.getElementById("multi-name").value.trim();
    const modifier = parseInt(document.getElementById("multi-modifier").value);
    const manualInitiative = parseInt(document.getElementById("multi-manual-initiative").value);
    const count = parseInt(document.getElementById("multi-count").value);

    if (!name) {
        alert("Please enter a name.");
        return;
    }

    if (!modifier && isNaN(manualInitiative)) {
        alert("Please enter an initiative or a modifier.");
        return;
    }

    if (modifier && manualInitiative) {
        alert("You cannot have both a modifier and a manual initiative.");
        return;
    }

    if (!count || count < 1) {
        alert("Please enter a valid count number (1 or more).");
        return;
    }

    // Determine the next available number for the character
    let existingNumbers = initiativeArray
        .filter(char => char.name.startsWith(name))
        .map(char => {
            const match = char.name.match(/\d+$/);
            return match ? parseInt(match[0]) : 0;
        });

    let nextNumber = existingNumbers.length > 0 ? Math.max(...existingNumbers) + 1 : 1;

    for (let i = 0; i < count; i++) {
        let initiative = modifier ? rollInitiative() + modifier : manualInitiative;
        let instanceName = `${name} ${nextNumber + i}`;
        initiativeArray.push({ name: instanceName, initiative });
    }

    updateInitiativeList();

    // Clear input fields
    document.getElementById("multi-name").value = "";
    document.getElementById("multi-manual-initiative").value = "";
    document.getElementById("multi-modifier").value = "";
    document.getElementById("multi-count").value = "";
}

// Function to display the initiative order
function updateInitiativeList() {
    const initiativeList = document.getElementById("initiative-list");
    initiativeList.innerHTML = ""; // Clear the list

    // Sort initiative order in descending order
    initiativeArray.sort((a, b) => b.initiative - a.initiative);

    initiativeArray.forEach((char, index) => {
        const entry = document.createElement("div");
        entry.innerHTML = `${char.initiative}: ${char.name} 
            <button onclick="removeInitiative(${index})">❌</button>`;
        initiativeList.appendChild(entry);
    });
}

// Function to remove a single initiative entry
function removeInitiative(index) {
    if (index >= 0 && index < initiativeArray.length) {
        initiativeArray.splice(index, 1);
        updateInitiativeList(); // Refresh the display
    }
}

// Function to clear all initiatives
function clearInitiative() {
    initiativeArray = [];
    updateInitiativeList();
}
