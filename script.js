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

    initiativeArray.push({ name, initiative, health });

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
    const health = parseInt(document.getElementById("multi-health").value); // Default to 10 if empty

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
        initiativeArray.push({ name: instanceName, initiative, health }); // Now stores health properly
    }

    updateInitiativeList();
}


// Function to display the initiative order
function updateInitiativeList() {
    const initiativeList = document.getElementById("initiative-list");
    initiativeList.innerHTML = ""; // Clear the list

    // Sort initiative order in descending order
    initiativeArray.sort((a, b) => b.initiative - a.initiative);

    localStorage.setItem("initiativeData", JSON.stringify(initiativeArray));

    initiativeArray.forEach((char, index) => {
        const entry = document.createElement("div");
        entry.classList.add("initiative-entry");

        // Initiative text
        const initiativeText = document.createElement("span");
        initiativeText.textContent = `${char.initiative}: ${char.name}`;

        // Decrease Health Button
        const decreaseHealth = document.createElement("button");
        decreaseHealth.textContent = "-";
        decreaseHealth.classList.add("health-btn");
        decreaseHealth.onclick = () => {
            initiativeArray[index].health -= 1;
            healthInput.value = initiativeArray[index].health; // Keep the input in sync
            updateInitiativeList();
        };

        // Health input field (Now Pre-filled with Assigned Health)
        const healthInput = document.createElement("input");
        healthInput.type = "number";
        healthInput.classList.add("health-input");
        healthInput.value = char.health; // Ensure the value is displayed correctly
        healthInput.onchange = (e) => updateHealth(index, e.target.value); // Save manually entered value

        // Increase Health Button
        const increaseHealth = document.createElement("button");
        increaseHealth.textContent = "+";
        increaseHealth.classList.add("health-btn");
        increaseHealth.onclick = () => {
            initiativeArray[index].health += 1;
            healthInput.value = initiativeArray[index].health; // Keep the input in sync
            updateInitiativeList();
        };

        // Remove Button
        const removeButton = document.createElement("button");
        removeButton.textContent = "❌";
        removeButton.classList.add("remove-btn");
        removeButton.onclick = () => removeInitiative(index);

        // Append elements in correct order
        entry.appendChild(initiativeText);
        entry.appendChild(decreaseHealth);
        entry.appendChild(healthInput);
        entry.appendChild(increaseHealth);
        entry.appendChild(removeButton);

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

function updateHealth(index, newHealth) {
    if (index >= 0 && index < initiativeArray.length) {
        initiativeArray[index].health = parseInt(newHealth) || 0; // Ensure valid number
    }
}
