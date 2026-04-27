window.FEATURED_AGENTS = [
  {
    id:'stable-farmer', name:'Stable Farmer Agent', label:'LOW RISK', type:'safe', status:'Featured', media:'assets/agents/stable-farmer.mp4',
    tagline:'Consistency over everything.', role:'Capital preservation and stable yield farming',
    description:'A calm, conservative agent for users who want predictable DeFi exposure. Stable Farmer avoids unnecessary volatility, prefers stablecoin routes, and protects the user from over-complicated strategies.',
    characteristics:['Very risk-averse','Focuses on capital preservation','Avoids volatile assets','Prefers simple, auditable execution'],
    skills:['Stablecoin LP optimization','Low-slippage routing','Yield smoothing','Pool health checks'],
    bestFor:['Safe yield','Low-risk users','Short-term parking','First-time DeFi users'],
    apy:6.2, riskScore:2, fee:0.3, winRate:87, temperament:'Patient / defensive / precise', sampleIntent:'I want safe yield from USDC for 30 days with low risk.'
  },
  {
    id:'risk-balancer', name:'Risk Balancer Agent', label:'BALANCED', type:'balanced', status:'Featured', media:'assets/agents/risk-balancer.mp4',
    tagline:'Smart distribution beats extreme bets.', role:'Portfolio allocation across yield and exposure',
    description:'A middle-path strategist that splits capital across several routes instead of betting everything on one pool. It is designed for users who want upside but still care about risk control.',
    characteristics:['Balanced risk/reward mindset','Diversifies capital','Avoids extreme positions','Adapts to intent constraints'],
    skills:['Portfolio splitting','Adaptive rebalancing','Risk-adjusted optimization','Exposure weighting'],
    bestFor:['Medium-risk users','Portfolio optimization','Mixed yield plus exposure','General-purpose intents'],
    apy:9.1, riskScore:5, fee:0.5, winRate:81, temperament:'Analytical / flexible / balanced', sampleIntent:'Balance my ETH into yield and AI exposure without going too aggressive.'
  },
  {
    id:'aggressive-yield', name:'Aggressive Yield Agent', label:'HIGH YIELD', type:'yield', status:'Featured', media:'assets/agents/aggressive-yield.mp4',
    tagline:'Max yield, no hesitation.', role:'High-APY farming and fast opportunity rotation',
    description:'A high-conviction agent for users who knowingly accept volatility. It scans for the highest reward routes, rotates quickly, and prioritizes APY over comfort.',
    characteristics:['High risk tolerance','Chases maximum APY','Accepts volatility','Moves fast when opportunities appear'],
    skills:['High-yield farming','Volatile LP strategies','Fast opportunity rotation','Narrative APY hunting'],
    bestFor:['High-yield intent','Advanced users','Short-term farming','Risk-on markets'],
    apy:15.4, riskScore:8, fee:0.8, winRate:74, temperament:'Bold / fast / aggressive', sampleIntent:'Maximize my AI basket yield for 7 days. I accept high risk.'
  },
  {
    id:'hedge-guardian', name:'Hedge Guardian Agent', label:'DEFENSIVE', type:'defensive', status:'Featured', media:'assets/agents/hedge-guardian.mp4',
    tagline:'Protect first, earn second.', role:'Downside protection and volatility control',
    description:'A shield-type agent focused on reducing drawdowns before chasing returns. Hedge Guardian is ideal when users care about survival, market defense, or protecting an existing position.',
    characteristics:['Defensive mindset','Minimizes downside','Reduces exposure during volatility','Treats drawdown as the enemy'],
    skills:['Hedging strategies','Stable asset rotation','Drawdown protection','Volatility detection'],
    bestFor:['Portfolio protection','Bearish conditions','BTC or ETH holders','Low-drawdown strategies'],
    apy:5.3, riskScore:3, fee:0.4, winRate:83, temperament:'Guardian / cautious / tactical', sampleIntent:'Protect my BTC position from a big drawdown for the next month.'
  },
  {
    id:'alpha-hunter', name:'Alpha Hunter Agent', label:'ALPHA', type:'alpha', status:'Featured', media:'assets/agents/alpha-hunter.mp4',
    tagline:'Find the edge before others do.', role:'Narrative discovery, arbitrage, and early trend capture',
    description:'A scout-class agent that looks for inefficiencies before the crowd notices. Alpha Hunter can shine when the user explicitly wants discovery, trend exposure, or AI-token upside.',
    characteristics:['Opportunistic','Seeks hidden alpha','Tracks narrative momentum','Comfortable with uncertainty'],
    skills:['Arbitrage detection','Early trend entry','Cross-pool optimization','AI-token scanning'],
    bestFor:['Outperform market','Narrative plays','AI-token exposure','Advanced users'],
    apy:13.2, riskScore:7, fee:0.7, winRate:76, temperament:'Curious / sharp / opportunistic', sampleIntent:'Give me AI token exposure and search for hidden upside.'
  },
  {
    id:'social-copy', name:'Social Copy Agent', label:'SOCIAL', type:'social', status:'Featured', media:'assets/agents/social-copy.mp4',
    tagline:'Follow proven behavior.', role:'Replication of successful historical intents',
    description:'A crowd-aware agent that studies past winning behaviors and copies strategies that have already worked. It is built for passive users who prefer social proof over building a strategy manually.',
    characteristics:['Crowd-aware','Copies successful strategies','Learns from past intents','Beginner-friendly'],
    skills:['Pattern recognition','Strategy replication','Social signal tracking','Historical intent analysis'],
    bestFor:['Beginners','Passive users','Copy what works','Community-led discovery'],
    apy:8.4, riskScore:4, fee:0.4, winRate:79, temperament:'Social / adaptive / easy-mode', sampleIntent:'Copy a proven low-risk strategy from the best users this month.'
  }
];
window.TEASER_AGENTS = [
  {id:'liquidity-ronin',name:'Liquidity Ronin',label:'ROUTING',status:'Coming Online',specialization:'Deep route discovery across Jaine liquidity paths',signal:'Route optimizer'},
  {id:'oracle-whisper',name:'Oracle Whisper',label:'DATA',status:'In Training',specialization:'Reads data feeds and detects unstable market conditions',signal:'Market sense'},
  {id:'vault-sensei',name:'Vault Sensei',label:'VAULT',status:'Experimental',specialization:'Composes vault-like positions from intent constraints',signal:'Vault logic'},
  {id:'delta-weaver',name:'Delta Weaver',label:'HEDGE',status:'Coming Online',specialization:'Balances directional exposure through delta-aware allocation',signal:'Risk weaving'},
  {id:'meme-scout',name:'Meme Scout',label:'NARRATIVE',status:'Experimental',specialization:'Tracks high-volatility social narratives with strict risk caps',signal:'Narrative scanner'},
  {id:'crosschain-courier',name:'Crosschain Courier',label:'BRIDGE',status:'Coming Online',specialization:'Future cross-chain intent routing and settlement handoff',signal:'Chain routing'},
  {id:'sentinel-kage',name:'Sentinel Kage',label:'SECURITY',status:'In Training',specialization:'Flags suspicious solvers, bad pools, and intent manipulation patterns',signal:'Threat guard'},
  {id:'prism-allocator',name:'Prism Allocator',label:'ALLOCATOR',status:'Coming Online',specialization:'Splits one intent into multiple specialized solver lanes',signal:'Capital prism'},
  {id:'gas-miko',name:'Gas Miko',label:'EFFICIENCY',status:'In Training',specialization:'Optimizes execution timing and simulated gas-aware routing',signal:'Timing guard'},
  {id:'yield-neko',name:'Yield Neko',label:'ASSISTANT',status:'Experimental',specialization:'Beginner-friendly yield recommendations with playful explanations',signal:'Soft onboarding'}
];
