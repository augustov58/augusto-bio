export default function SunsetBackground() {
  return (
    <>
      {/* Sky gradient */}
      <div className="absolute inset-0" style={{
        background: `linear-gradient(180deg,
          #4a4a7a 0%, #555288 8%, #5e5a90 15%, #5e7a90 25%,
          #6a9a9a 35%, #8ad0c0 45%, #c0e8d8 52%, #f0d4a8 58%,
          #f2a66a 63%, #e8724a 68%, #d94a3a 73%, #c43838 78%,
          #8a2a3a 85%, #4a1a2a 100%)`
      }} />

      {/* Clouds */}
      <svg className="absolute top-0 left-0 w-full pointer-events-none opacity-70" style={{ height: '55%' }}
        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 400" preserveAspectRatio="none">
        <ellipse cx="200" cy="80" rx="180" ry="35" fill="rgba(60,55,100,0.35)"/>
        <ellipse cx="350" cy="70" rx="120" ry="28" fill="rgba(65,60,105,0.3)"/>
        <ellipse cx="800" cy="60" rx="200" ry="40" fill="rgba(60,55,100,0.3)"/>
        <ellipse cx="1050" cy="90" rx="150" ry="30" fill="rgba(65,60,105,0.25)"/>
        <ellipse cx="600" cy="110" rx="160" ry="25" fill="rgba(70,65,110,0.25)"/>
        <ellipse cx="150" cy="160" rx="140" ry="22" fill="rgba(80,70,120,0.2)"/>
        <ellipse cx="500" cy="180" rx="200" ry="28" fill="rgba(90,80,130,0.18)"/>
        <ellipse cx="900" cy="150" rx="180" ry="25" fill="rgba(80,75,115,0.2)"/>
        <ellipse cx="1150" cy="170" rx="130" ry="20" fill="rgba(85,75,120,0.18)"/>
        <ellipse cx="300" cy="250" rx="170" ry="20" fill="rgba(200,120,80,0.15)"/>
        <ellipse cx="700" cy="270" rx="220" ry="22" fill="rgba(210,130,70,0.12)"/>
        <ellipse cx="1000" cy="240" rx="160" ry="18" fill="rgba(190,110,70,0.15)"/>
      </svg>

      {/* Town skyline */}
      <svg className="absolute bottom-0 left-0 w-full pointer-events-none" style={{ height: '45%' }}
        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 330" preserveAspectRatio="none">
        {/* Far background */}
        <g fill="#6b4a6b" opacity={0.45}>
          <rect x="180" y="130" width="18" height="120"/>
          <polygon points="180,130 189,105 198,130"/>
          <rect x="50" y="180" width="80" height="70"/>
          <rect x="280" y="170" width="60" height="80"/>
          <rect x="420" y="185" width="90" height="65"/>
          <rect x="600" y="175" width="70" height="75"/>
          <rect x="780" y="165" width="55" height="85"/>
          <rect x="950" y="180" width="85" height="70"/>
          <rect x="1120" y="170" width="65" height="80"/>
        </g>

        {/* Mid layer */}
        <g fill="#5a3858" opacity={0.6}>
          <rect x="0" y="210" width="65" height="90"/>
          <polygon points="0,210 32,185 65,210"/>
          <rect x="75" y="220" width="50" height="80"/>
          <polygon points="75,220 100,198 125,220"/>
          <rect x="140" y="205" width="70" height="95"/>
          <polygon points="140,205 175,180 210,205"/>
          <rect x="260" y="215" width="55" height="85"/>
          <polygon points="260,215 287,192 315,215"/>
          <rect x="330" y="200" width="80" height="100"/>
          <rect x="440" y="218" width="45" height="82"/>
          <polygon points="440,218 462,195 485,218"/>
          <rect x="520" y="190" width="60" height="110"/>
          <rect x="610" y="212" width="55" height="88"/>
          <polygon points="610,212 637,188 665,212"/>
          <rect x="700" y="205" width="70" height="95"/>
          <polygon points="700,205 735,178 770,205"/>
          <rect x="820" y="195" width="50" height="105"/>
          <rect x="890" y="215" width="65" height="85"/>
          <polygon points="890,215 922,190 955,215"/>
          <rect x="980" y="208" width="55" height="92"/>
          <polygon points="980,208 1007,185 1035,208"/>
          <rect x="1060" y="200" width="75" height="100"/>
          <rect x="1160" y="212" width="50" height="88"/>
          <polygon points="1160,212 1185,190 1210,212"/>
          <rect x="1230" y="205" width="50" height="95"/>
        </g>

        {/* Front layer */}
        <g fill="#3d2040" opacity={0.7}>
          <rect x="0" y="248" width="75" height="82"/>
          <polygon points="0,248 37,222 75,248"/>
          <rect x="90" y="255" width="100" height="75"/>
          <rect x="210" y="242" width="60" height="88"/>
          <polygon points="210,242 240,218 270,242"/>
          <rect x="250" y="222" width="8" height="20"/>
          <rect x="310" y="250" width="90" height="80"/>
          <rect x="420" y="245" width="55" height="85"/>
          <polygon points="420,245 447,220 475,245"/>
          <rect x="500" y="230" width="65" height="100"/>
          <rect x="590" y="252" width="50" height="78"/>
          <polygon points="590,252 615,228 640,252"/>
          <rect x="660" y="245" width="70" height="85"/>
          <polygon points="660,245 695,218 730,245"/>
          <rect x="770" y="255" width="55" height="75"/>
          <rect x="845" y="240" width="80" height="90"/>
          <rect x="950" y="250" width="50" height="80"/>
          <polygon points="950,250 975,225 1000,250"/>
          <rect x="1020" y="245" width="65" height="85"/>
          <polygon points="1020,245 1052,220 1085,245"/>
          <rect x="1110" y="255" width="90" height="75"/>
          <rect x="1220" y="248" width="60" height="82"/>
          <polygon points="1220,248 1250,222 1280,248"/>
        </g>

        {/* Windows */}
        <g fill="#ffd080" opacity={0.65}>
          <rect x="105" y="268" width="6" height="7" rx={0.5}/><rect x="120" y="268" width="6" height="7" rx={0.5}/>
          <rect x="145" y="268" width="6" height="7" rx={0.5}/><rect x="160" y="268" width="6" height="7" rx={0.5}/>
          <rect x="225" y="258" width="5" height="6" rx={0.5}/><rect x="240" y="258" width="5" height="6" rx={0.5}/>
          <rect x="330" y="262" width="6" height="7" rx={0.5}/><rect x="355" y="262" width="6" height="7" rx={0.5}/>
          <rect x="375" y="262" width="6" height="7" rx={0.5}/>
          <rect x="435" y="260" width="5" height="6" rx={0.5}/><rect x="450" y="260" width="5" height="6" rx={0.5}/>
          <rect x="515" y="245" width="5" height="6" rx={0.5}/><rect x="530" y="245" width="5" height="6" rx={0.5}/>
          <rect x="515" y="260" width="5" height="6" rx={0.5}/><rect x="540" y="260" width="5" height="6" rx={0.5}/>
          <rect x="605" y="265" width="5" height="6" rx={0.5}/><rect x="618" y="265" width="5" height="6" rx={0.5}/>
          <rect x="680" y="258" width="5" height="6" rx={0.5}/><rect x="700" y="258" width="5" height="6" rx={0.5}/>
          <rect x="860" y="255" width="5" height="6" rx={0.5}/><rect x="880" y="255" width="5" height="6" rx={0.5}/>
          <rect x="860" y="268" width="5" height="6" rx={0.5}/><rect x="900" y="268" width="5" height="6" rx={0.5}/>
          <rect x="965" y="262" width="5" height="6" rx={0.5}/><rect x="978" y="262" width="5" height="6" rx={0.5}/>
          <rect x="1035" y="258" width="5" height="6" rx={0.5}/><rect x="1055" y="258" width="5" height="6" rx={0.5}/>
          <rect x="1130" y="268" width="6" height="7" rx={0.5}/><rect x="1155" y="268" width="6" height="7" rx={0.5}/>
          <rect x="1175" y="268" width="6" height="7" rx={0.5}/>
        </g>
        <g fill="#ff9060" opacity={0.4}>
          <rect x="335" y="275" width="6" height="7" rx={0.5}/>
          <rect x="530" y="275" width="5" height="6" rx={0.5}/>
          <rect x="785" y="268" width="5" height="6" rx={0.5}/>
          <rect x="1240" y="262" width="5" height="6" rx={0.5}/>
        </g>

        {/* Shop awnings */}
        <rect x="90" y="253" width="100" height="4" rx={1} fill="#c44040" opacity={0.35}/>
        <rect x="1110" y="253" width="90" height="4" rx={1} fill="#4060a0" opacity={0.3}/>
        <rect x="310" y="248" width="90" height="4" rx={1} fill="#40a060" opacity={0.3}/>

        {/* Power lines */}
        <path d="M0,195 Q320,185 640,192 Q960,199 1280,190" stroke="rgba(60,35,55,0.35)" strokeWidth={1} fill="none"/>
        <path d="M0,205 Q320,198 640,203 Q960,208 1280,200" stroke="rgba(60,35,55,0.25)" strokeWidth={0.8} fill="none"/>

        {/* Power poles */}
        <rect x="320" y="155" width="3" height="175" fill="rgba(60,35,55,0.45)"/>
        <line x1="312" y1="190" x2="332" y2="190" stroke="rgba(60,35,55,0.4)" strokeWidth={1.5}/>
        <rect x="850" y="145" width="3" height="185" fill="rgba(60,35,55,0.45)"/>
        <line x1="842" y1="185" x2="862" y2="185" stroke="rgba(60,35,55,0.4)" strokeWidth={1.5}/>

        {/* Street */}
        <rect x="0" y="300" width="1280" height="30" fill="rgba(50,25,45,0.45)"/>
        <line x1="0" y1="315" x2="1280" y2="315" stroke="rgba(255,200,100,0.08)" strokeWidth={1} strokeDasharray="20,30"/>
      </svg>

      {/* Sun glow */}
      <div className="absolute pointer-events-none" style={{
        left: '50%', top: '47%', transform: 'translate(-50%,-50%)',
        width: 220, height: 220, borderRadius: '50%',
        background: 'radial-gradient(circle,rgba(255,190,90,0.5) 0%,rgba(255,130,60,0.2) 35%,transparent 65%)'
      }} />

      {/* Warm haze at horizon */}
      <div className="absolute left-0 right-0 pointer-events-none" style={{
        top: '55%', height: '15%',
        background: 'linear-gradient(180deg,transparent,rgba(255,150,80,0.08),transparent)'
      }} />

      {/* Noise overlay */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.05, mixBlendMode: 'overlay' }}
        xmlns="http://www.w3.org/2000/svg">
        <filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves={4} stitchTiles="stitch"/></filter>
        <rect width="100%" height="100%" filter="url(#noise)"/>
      </svg>
    </>
  );
}
