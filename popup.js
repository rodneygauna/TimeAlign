document.getElementById("convertBtn").addEventListener("click", () => {
  const input = document.getElementById("dateTimeInput").value;
  if (!input) return;

  const localDate = new Date(input);
  const zones = {
    "Pacific (PT)": "America/Los_Angeles",
    "Arizona (AZT)": "America/Phoenix",
    "Mountain (MT)": "America/Denver",
    "Central (CT)": "America/Chicago",
    "Eastern (ET)": "America/New_York",
  };

  let outputHTML = "";
  let copyText = "";

  for (const [label, zone] of Object.entries(zones)) {
    const zonedTime = new Intl.DateTimeFormat("en-US", {
      timeZone: zone,
      dateStyle: "long",
      timeStyle: "short",
    }).format(localDate);

    outputHTML += `
      <tr>
        <td><strong>${label}</strong> ${zonedTime}</td>
        <td><button class="button-link copyBtn" data-text="${label}: ${zonedTime}">Copy</button></td>
      </tr>
    `;
    copyText += `${label}: ${zonedTime}\n`;
  }

  // Add the copy all and reset buttons to the bottom of the table
  outputHTML += `
    <button id="copyAllBtn" class="button-success">Copy to Clipboard</button>
    <button id="resetBtn" class="button-danger">Reset</button>
  `;

  document.getElementById("output").innerHTML = outputHTML;
  document.getElementById("copyAllBtn").style.display = "inline-block";

  // Add copy buttons
  document.querySelectorAll(".copyBtn").forEach((btn) =>
    btn.addEventListener("click", () => {
      navigator.clipboard.writeText(btn.dataset.text);
    })
  );

  // Copy All
  document.getElementById("copyAllBtn").onclick = () => {
    navigator.clipboard.writeText(copyText);
  };

  // Clear input field and output
  document.getElementById("resetBtn").onclick = () => {
    document.getElementById("dateTimeInput").value = "";
    document.getElementById("output").innerHTML = "";
  };
});
