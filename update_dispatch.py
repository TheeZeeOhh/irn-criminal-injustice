import os
import re

video_html = """
<!-- VIDEO STORYBOARD -->
<section style="background: #111; border-bottom: 1px solid var(--hairline); padding: 40px 0;">
  <div class="wrap" style="text-align: center;">
    <div class="eyebrow" style="justify-content: center; color: var(--ember); font-family: 'DM Mono', monospace; font-size: .7rem; letter-spacing: .26em; text-transform: uppercase; display: flex; align-items: center; gap: 12px; margin-bottom: 14px;">Interactive Storyboard</div>
    <h2 style="font-size: clamp(1.7rem,4.5vw,2.5rem); font-weight: 700; line-height: 1.12; margin-bottom: 20px; color: var(--bone);">The Dispatch: <span class="accent" style="color: var(--gold); font-style: italic;">Power Hates Witnesses</span></h2>
    <div style="position: relative; max-width: 800px; margin: 0 auto; border: 1px solid var(--ember);">
      <img id="storyboard-img" src="/irn-criminal-injustice/irn_intro_title_1781399999076.jpg" style="width: 100%; aspect-ratio: 16/9; object-fit: cover; filter: brightness(0.8);">
      <div id="subtitle-box" style="position: absolute; bottom: 20px; left: 20px; right: 20px; background: rgba(0,0,0,0.8); color: var(--bone); padding: 15px; font-family: 'DM Mono', monospace; font-size: 1rem; border-left: 3px solid var(--ember); display: none;"></div>
    </div>
    <button id="play-btn" class="btn" style="margin-top: 20px; font-size: 1rem; padding: 15px 40px; font-family: 'DM Mono', monospace; letter-spacing: .22em; text-transform: uppercase; border: 1px solid var(--ember); color: var(--bone); background: linear-gradient(135deg,rgba(226,85,43,.25),rgba(226,85,43,.08)); cursor: pointer; transition: background .25s, color .25s;">
      ▶ Play Voiceover & Video
    </button>
  </div>
</section>

<script>
document.getElementById('play-btn').addEventListener('click', function() {
  if (!window.speechSynthesis) {
    alert("Your browser does not support text-to-speech voiceovers.");
    return;
  }
  
  const btn = this;
  btn.innerText = "Playing...";
  btn.disabled = true;
  btn.style.opacity = '0.5';
  
  const img = document.getElementById('storyboard-img');
  const subtitles = document.getElementById('subtitle-box');
  subtitles.style.display = 'block';
  
  const scenes = [
    {
      img: '/irn-criminal-injustice/irn_intro_title_1781399999076.jpg',
      text: "Power hates witnesses."
    },
    {
      img: '/irn-criminal-injustice/irn_metrics_dashboard_1781400010390.jpg',
      text: "The numbers don't flinch. Eight hundred and ninety-three community reports. One hundred and twenty-seven active civil rights cases. Eleven agencies under our review. Systems are failing faster than communities can recover."
    },
    {
      img: '/irn-criminal-injustice/irn_bureaucratic_maze_1781400021714.jpg',
      text: "Day 1: Application. Day 14: Silence. Day 41: Rejection. This is not just bureaucracy. This is policy experienced as exhaustion."
    },
    {
      img: '/irn-criminal-injustice/irn_community_voices_1781400032479.jpg',
      text: "When systems break, people do not disappear. They improvise. They organize. They survive."
    },
    {
      img: '/irn-criminal-injustice/irn_intro_title_1781399999076.jpg',
      text: "The truth belongs in the record. Submit your report today."
    }
  ];

  window.speechSynthesis.cancel(); // clear queue
  
  let currentScene = 0;
  
  function playScene(index) {
    if(index >= scenes.length) {
      btn.innerText = "▶ Replay";
      btn.disabled = false;
      btn.style.opacity = '1';
      return;
    }
    
    const scene = scenes[index];
    img.src = scene.img;
    subtitles.innerText = scene.text;
    
    const utterance = new SpeechSynthesisUtterance(scene.text);
    utterance.rate = 0.9;
    utterance.pitch = 0.8;
    
    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find(v => v.name.includes("Google US English") || v.name.includes("Samantha"));
    if(preferred) utterance.voice = preferred;
    
    utterance.onend = () => {
      setTimeout(() => playScene(index + 1), 500);
    };
    
    window.speechSynthesis.speak(utterance);
  }
  
  playScene(0);
});
</script>
"""

files_to_update = [
    '/home/aziza/IRN_Command_Center/IRN_Projects/irn-criminal-injustice/public/irn-dispatch-vol01.html',
    '/home/aziza/IRN_Command_Center/IRN_Projects/irn-criminal-injustice/public/dispatch-vol01.html'
]

for filepath in files_to_update:
    if os.path.exists(filepath):
        with open(filepath, 'r') as f:
            content = f.read()
        
        # Inject the video HTML right after </header>
        if "<!-- VIDEO STORYBOARD -->" not in content:
            content = content.replace('</header>', '</header>\\n' + video_html)
        
        # Replace ONLY BeKura's image using regex
        content = re.sub(
            r'<img src="data:image/jpeg;base64,[^"]+" alt="Book cover: The Illusion of Power by BeKura Shabazz [^"]+">',
            r'<img src="/irn-criminal-injustice/bekura.jpg" style="width:100%; border: 1px solid var(--hairline);" alt="BeKura Shabazz">',
            content
        )

        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Updated {filepath}")
