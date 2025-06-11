<h1 align="center">
  <img src="STTIDS/assets/butterfly.gif" width="180px" alt="Butterfly Logo"/>
  <br/>
  <strong>Butterfly - Terror Threat Intelligence & Detection System</strong>
</h1>

<p align="center">
  <i>A smart, AI-powered web platform for reporting, analyzing, and managing potential terrorist threats in real-time.</i><br/>
  <i>The system merges user-generated reports with intelligent text and image analysis to empower authorities and the public alike.</i>
</p>

---

## 🚀 Key Features

### 📌 Report Management
- 📝 <strong>Submit Report:</strong> Report suspicious activity with a detailed description and location.
- 📄 <strong>View Reports:</strong> View all submissions along with their <code>status</code>, <code>timestamp</code>, and <code>source</code>.
- 🛠️ <strong>Admin Controls:</strong> Update status, delete false alarms, or review flagged entries.

### 📊 Analytics Dashboard
- 📈 Interactive charts show live distribution of status types.
- 🔍 Gain insights from trends in report submissions.

### 🔍 Suspicious Text Analyzer
- 💬 Analyze any text for threats:
  - Outputs: <code>Safe</code>, <code>Spam</code>, <code>Phishing</code>, <code>Malware</code>
- ⚙️ Built with NLP for real-time threat interpretation.

### 🖼️ Object Detection from Images
- 📤 Upload images to scan for dangerous objects.
- 🎯 YOLOv8 detects suspicious content like weapons and explosive materials.
- 🧠 Seamless integration with AI for visual threat detection.

---

## 🛠️ Tech Stack

| 🔧 Component    | 🧾 Description                          |
|----------------|----------------------------------------|
| **Frontend**   | React.js with modern UI                |
| **Backend**    | Node.js (Express.js)                   |
| **Database**   | MongoDB (NoSQL)                        |
| **AI Models**  | NLP & YOLOv8 for threat detection      |
| **Libraries**  | Chart.js, Multer, Axios, TensorFlow    |

---

## 💡 How It Works

```text
1️⃣ A user submits a suspicious activity report via a form.
2️⃣ The system stores the report with status and metadata.
3️⃣ Admin reviews and updates the report status (or deletes false alarms).
4️⃣ Text Analyzer checks for spam, phishing, or malware indicators.
5️⃣ Object Detector (YOLOv8) scans images for threat-relevant content.
6️⃣ Analytics Dashboard updates live for actionable insights.
