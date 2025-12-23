export class Terminal {
  constructor(typewriterId, logsId, onComplete) {
    this.typewriterEl = document.getElementById(typewriterId);
    this.logsEl = document.getElementById(logsId);
    this.onComplete = onComplete;
    this.command = "npm install christmas-tree";
    this.typingSpeed = 30; 
    // Default fallback packages
    this.packages = [
      "extracting festive-spirit... [OK]",
      "fetching decoration-modules... [OK]",
      "parsing tinsel-dependencies... [OK]",
      "compiling binary-star... [OK]",
      "linking north-pole-api... [OK]",
      "optimizing reindeer-routes... [OK]",
      "wrapping presents... [OK]",
      "[WARN] glitter-leak detected, patching... [FIXED]",
      "installing snow-shader v2.0... [OK]",
      "deploying magic-kernel... [SUCCESS]",
      "injecting holiday-cheer... [SUCCESS]"
    ];
  }

  async start() {
    // Start fetching data in background while typing starts
    const fetchPromise = this.fetchRealNpmData();
    await this.typeCommand();
    // Wait for data if it's taking longer than typing (unlikely but safe)
    await fetchPromise; 
    await this.runInstall();
  }

  async fetchRealNpmData() {
    try {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), 2000); // 2s timeout
      
      const response = await fetch('https://registry.npmjs.org/christmas', { signal: controller.signal });
      clearTimeout(id);
      
      if (!response.ok) throw new Error("Network response was not ok");
      
      const data = await response.json();
      
      // Generate logs from real data
      const versions = Object.keys(data.versions).slice(-5); // Last 5 versions
      const latestVersion = data['dist-tags'].latest;
      const dependencies = data.versions[latestVersion].dependencies || {};
      const depNames = Object.keys(dependencies);
      
      const realPackages = [];
      
      // Add version checks
      versions.forEach(v => {
        realPackages.push(`checking christmas@${v}... [MATCHED]`);
      });

      // Add dependencies
      if (depNames.length > 0) {
        depNames.forEach(dep => {
           realPackages.push(`resolving ${dep}... [OK]`);
           realPackages.push(`fetching ${dep}@latest... [200 OK]`);
        });
      }

      // Add some flavor
      realPackages.push("running post-install scripts...");
      realPackages.push("generating holiday assets...");
      realPackages.push("[SUCCESS] installed christmas and " + (depNames.length + 3) + " packages");

      // Mix with some flavor text if list is too short
      if (realPackages.length < 10) {
         this.packages = [...realPackages, ...this.packages.slice(5)];
      } else {
         this.packages = realPackages;
      }

    } catch (e) {
      console.warn("Failed to fetch npm data, utilizing fallback", e);
      // Keep default packages
    }
  }

  typeCommand() {
    return new Promise((resolve) => {
      let i = 0;
      const interval = setInterval(() => {
        this.typewriterEl.textContent += this.command[i];
        i++;
        if (i >= this.command.length) {
          clearInterval(interval);
          setTimeout(resolve, 200); 
        }
      }, this.typingSpeed);
    });
  }

  runInstall() {
    return new Promise((resolve) => {
      let i = 0;
      const addLog = () => {
        if (i >= this.packages.length) {
          this.log("Done in 1.337s", "log-success");
          setTimeout(() => {
            if (this.onComplete) this.onComplete();
            resolve();
          }, 500);
          return;
        }

        const msg = this.packages[i];
        const className = msg.includes("[WARN]") ? "log-warn" : "log-bg";
        this.log(`[${i + 1}/${this.packages.length}] ${msg}`, className);
        
        i++;
        // Faster logs
        setTimeout(addLog, Math.random() * 80 + 20); // Even faster for real data feel
      };
      
      addLog();
    });
  }

  log(text, className = "") {
    const div = document.createElement("div");
    div.className = `log-line ${className}`;
    div.textContent = text;
    // Insert at top because of flex-direction: column-reverse in CSS
    this.logsEl.prepend(div);
  }
}
