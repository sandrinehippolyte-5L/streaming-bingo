import { useState, useEffect, useRef } from "react";

const FONT_URL = "https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap";

// ─── DONNÉES ─────────────────────────────────────────────────────────────────

const GENRES = [
  { id:"crime",     label:"Policier",          emoji:"🔍", accent:"#e94560", bg:"#08090f" },
  { id:"thriller",  label:"Thriller",           emoji:"😰", accent:"#ff7043", bg:"#0f0800" },
  { id:"scifi",     label:"Sci-Fi & Fantasy",   emoji:"🚀", accent:"#8b5cf6", bg:"#07060f" },
  { id:"anime",     label:"Anime",              emoji:"⚡", accent:"#f472b6", bg:"#0f0008" },
  { id:"horror",    label:"Horror",             emoji:"👻", accent:"#4ade80", bg:"#030303" },
  { id:"comedy",    label:"Comédie",            emoji:"😂", accent:"#facc15", bg:"#0c0b00" },
  { id:"teen",      label:"Teen",               emoji:"🎒", accent:"#a78bfa", bg:"#08061a" },
  { id:"action",    label:"Action",             emoji:"💥", accent:"#fb923c", bg:"#0f0400" },
  { id:"crime_doc", label:"True Crime",         emoji:"📹", accent:"#94a3b8", bg:"#080808" },
  { id:"mystery",   label:"Mystère",            emoji:"🔮", accent:"#c084fc", bg:"#06040f" },
  { id:"drama",     label:"Drama",              emoji:"💔", accent:"#fb7185", bg:"#0f0006" },
  { id:"romance",   label:"Romance",            emoji:"💕", accent:"#f9a8d4", bg:"#0f0009" },
];

const SHOWS = [
  { id:"bridgerton",    label:"Bridgerton",      emoji:"🌹", accent:"#e8c07d", bg:"#110800",  tag:"Netflix",    art:["🌹","💌","👑","🎭","💐"], poster:"https://upload.wikimedia.org/wikipedia/en/3/3d/Bridgerton_Title_Card.png" },
  { id:"laworder",      label:"Law & Order",      emoji:"⚖️",  accent:"#5b9cf6", bg:"#04080f",  tag:"NBC",        art:["⚖️","🔨","🚔","📋","🏛️"], poster:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Law_%26_Order_%28logo%29.svg/500px-Law_%26_Order_%28logo%29.svg.png", posterBg:"#f0f0f0" },
  { id:"loveisblind",   label:"Love is Blind",    emoji:"💍", accent:"#ff8fa3", bg:"#110008",  tag:"Netflix",    art:["💍","💌","🥂","💒","🌸"], poster:"https://upload.wikimedia.org/wikipedia/en/b/b0/Love_is_Blind_title_card.png" },
  { id:"scrubs",        label:"Scrubs",           emoji:"🩺", accent:"#2dd4bf", bg:"#030f0d",  tag:"ABC",        art:["🩺","💊","🏥","😂","🦅"], poster:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Scrubs_%28TV_series%29_logo.svg/500px-Scrubs_%28TV_series%29_logo.svg.png" },
  { id:"heatedrivalry", label:"Heated Rivalry",   emoji:"🏒", accent:"#fb923c", bg:"#0f0500",  tag:"Peacock",    art:["🏒","🥅","🔥","🏆","⛸️"], poster:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Logo_Heated_Rivalry.svg/500px-Logo_Heated_Rivalry.svg.png" },
  { id:"thepitt",       label:"The Pitt",         emoji:"🚨", accent:"#f87171", bg:"#0f0000",  tag:"Max",        art:["🚨","🩹","💉","🏃","⏱️"], poster:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/The_Pitt_Max_series_logo.svg/500px-The_Pitt_Max_series_logo.svg.png" },
  { id:"tedlasso",      label:"Ted Lasso",        emoji:"⚽", accent:"#86efac", bg:"#030f05",  tag:"Apple TV+",  art:["⚽","🍪","🎯","📣","🏅"], poster:"https://upload.wikimedia.org/wikipedia/en/7/73/Tedlassotitlecard.jpg" },
  { id:"greys",         label:"Grey's Anatomy",   emoji:"🩻", accent:"#38bdf8", bg:"#02070f",  tag:"ABC",        art:["🩻","💙","🏥","💔","🩺"], poster:"https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Grey%27s_Anatomy_Logo.svg/500px-Grey%27s_Anatomy_Logo.svg.png", posterBg:"#e8f4f8" },
  { id:"bluey",         label:"Bluey",            emoji:"🐶", accent:"#60a5fa", bg:"#030a1a",  tag:"ABC Kids",   art:["🐶","🎨","🏡","👨‍👩‍👧‍👦","🎪"], poster:"https://upload.wikimedia.org/wikipedia/en/4/48/Bluey_%282018_TV_series%29_title_card.jpg" },
  { id:"industry",      label:"Industry",         emoji:"📈", accent:"#a3e635", bg:"#040800",  tag:"HBO",        art:["📈","💊","🏙️","💸","📱"], poster:"https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Industry-s2-logo-1200x300.png/500px-Industry-s2-logo-1200x300.png", posterBg:"#f0f0f0" },
];

const TROPES = {
  crime:     ["Course-poursuite en voiture","Témoin de dernière minute","Addiction du flic","Rendez-moi votre badge","Le coupable = 1er suspect","Scène de crime sous la pluie","Partenaires qui se détestent","Labo médico high-tech","Le tueur laisse un indice","Flic qui joue cavalier seul","La victime avait des secrets","Confrontation dans un entrepôt","L'indic qui disparaît","Flashback révélateur","LIBRE","Profileur génial mais torturé","L'avocat véreux","On n'a pas le temps","Dossier classé qui se rouvre","Meurtre en série avec rituel","Coup de fil anonyme","La nuit de l'arrestation rate","Rebondissement avant générique","Suspect qui fuit = coupable","Héros suspendu de son poste"],
  thriller:  ["Protagoniste qui ne dort plus","Quelqu'un regarde par la fenêtre","Téléphone qui coupe","Le héros sait trop","Twist final imprévu","Poursuite dans une ruelle","Personne ne croit le héros","Le méchant était proche","Flashback traumatique","La voiture refuse de démarrer","Plan de secours qui rate","Un mort qui revient","LIBRE","Maison surveillée à l'insu","Identité volée","Complot gouvernemental","Faux ami depuis le début","Je sais qui tu es","Course à travers les toits","Sac de billets qui change de mains","Témoin qui disparaît","Appel depuis l'intérieur","Miroir sans tain","Le héros est piégé","Révélation au dernier épisode"],
  scifi:     ["Le héros est l'Élu","Trahison d'un allié","Voyage dans le temps","La technologie a un coût caché","Cliffhanger cosmique fin de saison","Sacrifice d'un personnage","L'ennemi avait raison sur un point","Mentor qui meurt","Romance entre ennemis","Monde avec une règle absurde","LIBRE","L'IA devient consciente","Portail vers une autre dimension","Planète jumelle de la Terre","Prophétie mal interprétée","Alliance fragile entre espèces","Arme capable de tout détruire","Rebelle contre le système","Mémoire effacée ou fausse","Clone du héros","Ressource rare = enjeu principal","Enfant au pouvoir incontrôlable","Personnage qui n'est pas humain","Temps en boucle","Fin qui remet tout en question"],
  anime:     ["Transformation spectaculaire","Cri du nom de l'attaque","Flashback d'enfance douloureux","Power-up de dernière minute","Ami sacrifié pour motiver","Entraînement intensif en montage","Protagoniste tombe sur qqn à moitié nu","Combat en 3 épisodes minimum","Nakama speech","Rival qui devient allié","LIBRE","Antagoniste au passé tragique","Pouvoir secret en situation de crise","Petit personnage = le plus fort","Déjeuner partagé - moment crucial","Tournoi arc","Maître mystérieux et excentrique","Personnage féminin sous-estimé","Je ne perdrai jamais !","Épisode spécial à la plage","Technique impossible apprise en 1 nuit","Œil qui change de couleur","Allié de dernière minute","Boss final en 3 formes","Rire gêné sans raison"],
  horror:    ["Ne va pas là-bas","Lumières qui clignotent","Le groupe se sépare","Fausse alerte avant la vraie","Maison abandonnée à explorer","Signal coupé au pire moment","Bruit inexpliqué dans le grenier","Enfant qui parle à une entité","Le monstre jamais montré entier","C'est probablement rien","LIBRE","Le chat fait peur à la place","Personnage qui revient possédé","Miroir qui montre autre chose","Sous-sol = mauvaise idée","Voiture en panne","Nuit sans lune","Vieux journal ou livre maudit","Personne ne croit le survivant","Le méchant est déjà dans la maison","Happy end trop vite arrivé","Twist : c'était réel","Lampe qui faiblit au pire moment","Rituel accidentellement accompli","Fin ouverte - suite possible"],
  comedy:    ["Malentendu évitable","Personnage qui tombe à pic","Réplique culte répétée","Plan qui déraille totalement","Le personnage geek/nerd","Romance will-they-won't-they","Scène de repas qui part en chaos","Personnage caché qui entend tout","Double sens non assumé","Épisode spécial Noël","LIBRE","Le patron complètement à côté","Mensonge qui s'emballe","Déguisement qui ne trompe personne","Couple incompatible = couple parfait","Ami aux conseils catastrophiques","Situation embarrassante en public","Moment de sincérité inattendu","Running gag qu'on voit venir","Personnage au premier degré","Flash-forward raté","L'épisode rétrospectif","Révélation vite oubliée","Secondaire qui vole la scène","C'est pas ce que tu crois"],
  teen:      ["Le/la nouveau(elle) en ville","Triangle amoureux","La fête qui tourne mal","Conseil des élèves ultra sérieux","Secret de famille révélé","La bande des populaires","Premier amour = amour de sa vie","Bal de promo","Adultes absents ou inutiles","Marginal qui devient cool","LIBRE","Rival romantique parfait mais ennuyeux","Le plan pour changer d'image","Trahison de la meilleure amie","Groupe improbable qui se soude","Soirée pyjama révélatrice","Mes parents ne comprennent rien","Audition ou compétition scolaire","Texte envoyé à la mauvaise personne","Enfant surdoué incompris","Romance secrète au lycée","Moment de transformation vestimentaire","Problème existentiel résolu en 40 min","Flashback sur la meilleure amitié","Départ pour l'université"],
  action:    ["Explosion sans se retourner","Héros invincible aux balles","Discours avant combat final","Sidekick comique","Le méchant explique son plan","Combat mains nues interminable","Sauvetage in extremis","Voiture qui explose au ralenti","Il nous reste 30 secondes","Blessure oubliée à l'épisode suivant","LIBRE","Munitions infinies","Héros captif qui s'échappe","QG ultra sophistiqué","Agent double révélé au mauvais moment","Poursuite moto dans un marché","Hélicoptère = mauvais présage","Équipe qui se retrouve malgré tout","Héros qui refuse d'abandonner","Retournement dans les 5 dernières min","La femme est toujours en danger","Je travaille seul","Trahison du chef","Combat en tenue de soirée","Arme secrète au dernier moment"],
  crime_doc: ["Voisin : il était si normal","Archives photos floues et jaunies","Reconstitution amateur","Expert : on n'a jamais vu ça","Twist : c'était quelqu'un de proche","Journaliste = héros de l'histoire","Cliffhanger entre chaque épisode","L'affaire n'est pas résolue","Musique angoissante sur images banales","Interviewé qui pleure","LIBRE","Lettre ou journal lu en voix off","Ligne de temps avec icônes","Avocat qui conteste tout","Survivant revenu après 20 ans","Détail passé inaperçu à l'époque","Photo Facebook comme seul portrait","Famille divisée sur la culpabilité","Crime qui date de décennies","Pétition pour rouvrir le dossier","Ancien policier qui regrette","Reconstitution visage flouté","On a reçu des menaces après diffusion","Fin : le coupable nie encore","Vraie photo de la victime au générique"],
  mystery:   ["Huis clos avec suspects limités","Le détective non officiel","Indice planqué depuis le début","Fausse piste assumée","Révélation en réunissant tout le monde","Personnage cache (mais c'est pas lui)","Journal intime découvert","Le coupable le moins probable","Alibi qui s'effondre","Vous avez failli mourir pour ça","LIBRE","Maison de famille avec un passé trouble","Objet qui change de place tout seul","Mort présentée comme accident","Témoin qui se rétracte","Message caché dans quelque chose de banal","Double identité révélée","Tous avaient un mobile","Le vieux qui sait tout","La lettre arrivée trop tard","Coïncidence suspecte","Mort du détective avant la fin","Le commanditaire - pas l'exécutant","Clé USB ou document secret","Dénouement en flash-back"],
  drama:     ["Famille dysfonctionnelle","Retour du passé qui dérange","Crise au pire moment","Personnage qui touche le fond","Révélation de paternité","Mort inattendue d'un perso aimé","Dispute qui dure 3 saisons","Discours plein de larmes","Ellipse temporelle","Réconciliation de dernière minute","LIBRE","Addiction comme arc narratif","Amour de jeunesse qui revient","Départ sans dire au revoir","Trahison au sein de la famille","Héritage = source de tout le mal","Rédemption qu'on attendait","Lettre non envoyée","Maladie grave comme révélateur","Enfant miroir des parents","Mensonge bienveillant qui détruit tout","Personnage qui s'efface pour les autres","Moment de grâce inattendu","Fin ambiguë sur un regard","Retour au lieu d'enfance"],
  romance:   ["Coup de foudre au mauvais moment","Malentendu qui brise le couple","Course à l'aéroport","Déclaration sous la pluie","On ne peut pas être ensemble (mais si)","Le rival parfait mais ennuyeux","Montage shopping et transformation","Nuit blanche à parler de tout","Baiser interrompu","Happy end garanti","LIBRE","Les meilleurs amis amoureux","Mariage raté pour la bonne cause","Retour après des années","Faux couple qui devient vrai","Grand geste romantique public","Je t'aimais depuis le début","Jalousie mal gérée = crise","Le voyage qui rapproche","Lettre d'amour lue trop tard","Appartement partagé par accident","Parent qui s'oppose","Rencontre lors d'un mariage","Je te déteste - je t'adore","Fin sur un sourire"],

  bridgerton:    ["La reine fait son entrée","Coup d'éventail suggestif","Regard intense à travers la salle","La débutante de la saison","Scandale révélé par Lady Whistledown","Bal ou soirée mondaine","Mère qui panique pour le mariage","Le héros résiste (mais pas longtemps)","Baiser dérobé dans un jardin","Mariage arrangé qui devient amour","Robe différente entre deux scènes","LIBRE","Frère ou sœur protecteur","Déclaration passionnée inattendue","Duel ou confrontation","Promenade en calèche romantique","La famille s'immisce dans tout","Rivalité entre prétendants","Personnage qui ment sur son statut","Musique pop en version baroque","Le couple se déteste avant de s'aimer","La haute société juge tout","Happy end avec demande en mariage","Simon ou Anthony cède à ses sentiments","Whistledown révèle LE secret de l'épisode"],
  laworder:      ["Corps trouvé dans les 2 premières minutes","Blague sèche d'un détective","Suspect évident = pas le coupable","Avocat de la défense retors","Objection ! - Accordée - Rejetée","Rebondissement de dernière minute","Témoignage qui change tout","Jury difficile à convaincre","Procureur qui doute de sa thèse","Preuve irrecevable","LIBRE","Crime inspiré de faits réels","Négociation de peine ratée","Juge complètement impassible","Maître, votre client...","Témoin qui se rétracte","Le vrai coupable était protégé","Confrontation en salle d'audience","Nouveau partenaire qui débarque","Crime politique ou haut profil","Verdict surprise","Famille de la victime dans le couloir","Détective qui suit son instinct","Dossier monté de toutes pièces","Dong dong"],
  loveisblind:   ["Je t'aime avant de se voir","Pod conversation de 3h","Demande en mariage avec bague","Première rencontre physique awkward","Parent qui n'approuve pas","Je suis prêt(e) pour l'engagement","Quelqu'un hésite à l'autel","Conflit sur le logement","Doutes exprimés face caméra","Est-ce que l'amour est vraiment aveugle ?","LIBRE","Couple qui se dispute sur des riens","Révélation choc pendant le voyage","Ex mentionné au mauvais moment","Quelqu'un pleure en interview","Rencontre des familles catastrophique","Couple qui rompt avant le mariage","Oui surprise à l'autel","Mariage annulé en direct","Différence de valeurs trop tard","Tension lors du voyage de fiançailles","Je l'ai choisi(e) pour une raison","Je ne suis pas sûr(e)","Larmes au moment du oui/non","Un couple encore ensemble après"],
  scrubs:        ["Daydream - fantasme de J.D.","Le Janitor tend un piège","Cox fait un speech cinglant","J.D. et Turk - bromance","Elliot dit quelque chose d'embarrassant","Kelso dit non à tout","Eagle ! de Turk","Carla fait la morale","Monologue intérieur de J.D.","Patient qui apprend une leçon de vie","LIBRE","Le Janitor blame J.D. pour rien","Cox appelle J.D. par un prénom féminin","Mort inattendue d'un patient","Turk et J.D. dansent","Moment d'émotion sincère inattendu","Jordan contre-attaque Cox","Ted est humilié","Ce moment est pour moi - raté","Kelso prend le café de quelqu'un","Patient qui survit contre toute attente","Elliot et J.D. rechutent","Cox admet que J.D. avait raison","Fin d'épisode avec leçon de vie","Moment de bromance parfaite Turk/J.D."],
  heatedrivalry: ["Accrochage physique après la sirène","Regard qui dure une seconde de trop","Le rival sait exactement quoi dire","Flashback sur la première rencontre","Match où tout bascule","Partenaire d'équipe qui voit tout","Conférence de presse tendue","Trahison du coach ou du club","Tension non dite dans les vestiaires","Victoire qui ressemble à une défaite","LIBRE","Blessure au pire moment","Chacun représente plus que lui-même","Scène de dispute qui vire à autre chose","Média qui s'emballe","Rival qui défend l'autre en public","Sacrifice pour l'équipe","On est pareils - tu le sais","Silence plus parlant qu'un discours","Réunion après une longue séparation","L'équipe découvre ce qui se passe","Moment de vulnérabilité inattendu","Ultimatum carrière vs sentiment","L'adversaire = seul qui comprend","Fin de match - fin de quelque chose"],
  thepitt:       ["Code dans le couloir","On le perd !","Médecin qui travaille 24h sans pause","Patient qui insulte le personnel","Diagnostic impossible résolu in extremis","Trauma par balle ou couteau","L'infirmière fait le vrai travail","Décision éthique impossible","Famille en salle d'attente depuis des heures","Interne qui panique","LIBRE","Appelez le chirurgien !","Patient arrivé en dernier recours","Décision médicale controversée","Drame personnel du médecin","Salle de trauma saturée","Patient qui refuse le traitement","On fait tout ce qu'on peut","Révélation médicale surprenante","Équipe épuisée qui continue quand même","Overdose ou tentative de suicide","Patient pédiatrique","Conflit entre médecins sur le protocole","Fin de shift impossible à quitter","Mort d'un patient malgré tout"],
  tedlasso:      ["Be curious not judgmental","Biscuits pour Rebecca","Roy dit un gros mot avec émotion","Keeley fait une entrée remarquée","Discours motivant totalement inattendu","Nate dit quelque chose de juste","Analogie américaine bizarre de Ted","Higgins dans son bureau minuscule","L'équipe perd mais apprend quelque chose","Beard à côté de Ted en silence","LIBRE","Jamie Tartt qui se remet en question","Sam fait preuve de maturité","Rebecca rit sincèrement","Darts au pub","Believe sur le mur","Ted évite de parler de son passé","Colin a un arc discret mais fort","Adversaire qui devient respectueux","Trent Crimm prend des notes","Crise de panique de Ted","Roy coache avec rage mais amour","Moment de vulnérabilité masculine","L'équipe se soude sur quelque chose d'absurde","Goldfish memory"],
  greys:         ["It's a beautiful day to save lives","Voix off philosophique en ouverture","Interne qui fait une erreur","Relation interdite à l'hôpital","Catastrophe de masse - bus ou tremblement","Mort inopinée d'un perso régulier","Cristina dit quelque chose de brutal","Meredith au fond du gouffre (encore)","Opération impossible réussie","Couple qui se sépare en plein bloc","LIBRE","Un résident pleure dans les toilettes","You're my person","Patient avec une histoire émouvante","Chef qui rappelle les règles","Twist médical improbable","Romance dans l'ascenseur","Pick me choose me love me","Nouveau perso qui va mourir","Désastre perso + médical simultanés","McDreamy mentionné","Interns class qui se soude","Final de saison - quelqu'un faillit mourir","Bagel en salle de repos","Personne ne fait de pause déjeuner"],
  bluey:         ["Bandit joue sans rechigner","Chilli cache sa frustration avec un sourire","Micro-leçon de vie pour les parents","Bluey refuse ses propres règles","Bingo pleure pour une bonne raison","Jack, Chloe ou Judo dans l'épisode","Nanna ou Papy arrive à pic","Calypso observe en silence","Les parents font la sieste (raté)","Tina impose ses règles","LIBRE","Jeu imaginaire qui dégénère","Bluey fait une scène au supermarché","Bob Heeler dit quelque chose de sage","Bandit rate son moment cool parent","Les adultes jouent aussi","Épisode qui fait pleurer les parents pas les enfants","Bluey teste les limites","Chilli dit that's not how it works","Famille élargie envahit la maison","Bandit finit épuisé et heureux","Bingo surprend tout le monde","Leçon sur la perte subtilement amenée","Fin en image fixe avec voix off","Unicorn Head fait une apparition"],
  industry:      ["Ligne de coke avant une réunion","This is how it works here","Harper fait quelque chose d'impulsif","Réunion clients qui tourne mal","Nuit blanche au bureau","Trahison entre collègues","Trade qui part de travers","Quelqu'un couche avec quelqu'un du bureau","You either have it or you don't","LIBRE","Moment de vulnérabilité après une victoire","Fête qui finit en catastrophe","Harper ment à quelqu'un de proche","Deal de dernière minute","Hiérarchie qui s'effondre","Licenciement ou promo sans prévenir","Conversation ambiguë sur l'éthique","P&L meeting tendue","Quelqu'un pète les plombs discrètement","L'argent comme seule métrique","Don't take it personally","Appel téléphonique qui change tout","Hangover professionnel","Fin ambiguë sur un regard","Erreur qui va revenir plus tard"],
};

// ─── UTILS ───────────────────────────────────────────────────────────────────
function mulberry32(seed) { return () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = t + Math.imul(t ^ (t >>> 7), 61 | t) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
function seededShuffle(arr, seed) { const rand = mulberry32(seed), a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function strToSeed(str) { let h = 5381; for (let i = 0; i < str.length; i++) h = (Math.imul(31, h) + str.charCodeAt(i)) | 0; return Math.abs(h); }
function randomCode() { const c = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; return Array.from({ length: 6 }, () => c[Math.floor(Math.random() * c.length)]).join(""); }
function makeCard(code, pid, gid) { const pool = TROPES[gid].filter(t => t !== "LIBRE"); const picked = seededShuffle(pool, strToSeed(`${code}||${pid}`)).slice(0, 24); picked.splice(12, 0, "LIBRE"); return picked; }
function checkBingo(checked) { const lines = []; for (let r = 0; r < 5; r++) lines.push([0,1,2,3,4].map(c => r*5+c)); for (let c = 0; c < 5; c++) lines.push([0,1,2,3,4].map(r => r*5+c)); lines.push([0,6,12,18,24]); lines.push([4,8,12,16,20]); return lines.filter(l => l.every(i => checked.has(i))); }
const ALL = [...GENRES, ...SHOWS];

// ─── STORAGE ─────────────────────────────────────────────────────────────────
async function storeGame(code, gid, mode) { try { await window.storage.set(`bg|${code}`, JSON.stringify({ gid, mode, ts: Date.now() }), true); } catch {} }
async function fetchGame(code) { try { const r = await window.storage.get(`bg|${code}`, true); return r ? JSON.parse(r.value) : null; } catch { return null; } }
async function storePlayer(code, pid, name, checked, meta) { try { await window.storage.set(`bgp|${code}|${pid}`, JSON.stringify({ name, checked: [...checked], meta: meta || {}, ts: Date.now() }), true); } catch {} }
async function fetchPlayers(code) { const result = []; for (let i = 1; i <= 8; i++) { try { const r = await window.storage.get(`bgp|${code}|${i}`, true); if (r) result.push({ pid: i, ...JSON.parse(r.value) }); } catch {} } return result; }

const PC = ["#e94560","#8b5cf6","#fb923c","#4ade80","#f472b6","#facc15","#38bdf8","#c084fc"];
const F = "'DM Sans', system-ui, sans-serif";

// ─── COMPOSANT PRINCIPAL ─────────────────────────────────────────────────────
function useWindowWidth() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 800);
  useEffect(() => {
    const handler = () => setW(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return w;
}

export default function StreamingBingo() {
  const [screen, setScreen]           = useState("home");
  const [tab, setTab]                 = useState("genres");
  const [gid, setGid]                 = useState(null);
  const [mode, setMode]               = useState("live"); // "live" | "async"
  const [code, setCode]               = useState("");
  const [pid, setPid]                 = useState(1);
  const [playerName, setPlayerName]   = useState("");
  const [codeInput, setCodeInput]     = useState("");
  const [nameInput, setNameInput]     = useState("");
  const [pidInput, setPidInput]       = useState(null);
  const [card, setCard]               = useState([]);
  const [checked, setChecked]         = useState(new Set([12]));
  const [meta, setMeta]               = useState({ 12: { ep:"", time:"" } });
  const [players, setPlayers]         = useState([]);
  const [lobbyPlayers, setLobbyPlayers] = useState([]);
  const [joinTaken, setJoinTaken]     = useState([]);
  const [gameMode, setGameMode]       = useState("live");
  const [error, setError]             = useState("");
  const [confetti, setConfetti]       = useState(false);
  const [prevB, setPrevB]             = useState(0);
  const [copied, setCopied]           = useState(false);
  // Async modal
  const [pendingCell, setPendingCell] = useState(null);
  const [epInput, setEpInput]         = useState("");
  const [timeInput, setTimeInput]     = useState("");
  // Tooltip
  const [tooltip, setTooltip]         = useState(null);
  const [showReveal, setShowReveal]   = useState(false);
  const saveRef = useRef(null);
  const modeRef = useRef(null);

  const windowW = useWindowWidth();
  const entry = ALL.find(x => x.id === gid);
  const accent = entry?.accent || "#888";
  const bg = entry?.bg || "#060606";
  const blines = checkBingo(checked);

  useEffect(() => { if (screen !== "lobby") return; const f = async () => setLobbyPlayers(await fetchPlayers(code)); f(); const t = setInterval(f, 3000); return () => clearInterval(t); }, [screen, code]);
  useEffect(() => { if (screen !== "game") return; const f = async () => setPlayers(await fetchPlayers(code)); f(); const t = setInterval(f, 4000); return () => clearInterval(t); }, [screen, code]);
  useEffect(() => {
    if (screen !== "join" || codeInput.length !== 6) { setJoinTaken([]); return; }
    const f = async () => { const ps = await fetchPlayers(codeInput); setJoinTaken(ps.map(p => p.pid)); };
    f(); const t = setInterval(f, 3000); return () => clearInterval(t);
  }, [screen, codeInput]);
  useEffect(() => {
    if (screen !== "game") return;
    clearTimeout(saveRef.current);
    saveRef.current = setTimeout(() => {
      storePlayer(code, pid, playerName, checked, meta);
      const l = checkBingo(checked).length;
      if (l > prevB) { setConfetti(true); setPrevB(l); setTimeout(() => setConfetti(false), 3500); }
    }, 300);
  }, [checked, meta]);

  const createGame = async () => { if (!gid) { setError("Choisissez un genre ou une série d'abord"); return; } const nc = randomCode(); await storeGame(nc, gid, mode); setCode(nc); setError(""); setScreen("lobby"); };
  const joinFromLobby = async () => {
    if (!pidInput) { setError("Choisissez votre numéro de joueur"); return; }
    const n = nameInput.trim() || `Joueur ${pidInput}`; setPid(pidInput); setPlayerName(n);
    const nc = makeCard(code, pidInput, gid); setCard(nc);
    const init = new Set([12]); setChecked(init); setMeta({ 12: { ep:"", time:"" } });
    await storePlayer(code, pidInput, n, init, {}); setPrevB(0); setError(""); setScreen("game");
  };
  const joinGame = async () => {
    const c = codeInput.trim().toUpperCase(); if (!c) { setError("Entrez un code"); return; }
    if (!pidInput) { setError("Choisissez votre numéro"); return; }
    const data = await fetchGame(c); if (!data) { setError("Code introuvable - vérifiez avec l'hôte"); return; }
    const n = nameInput.trim() || `Joueur ${pidInput}`; setCode(c); setGid(data.gid); setGameMode(data.mode || "live");
    setPid(pidInput); setPlayerName(n);
    const nc = makeCard(c, pidInput, data.gid); setCard(nc);
    const init = new Set([12]); setChecked(init); setMeta({ 12: { ep:"", time:"" } });
    await storePlayer(c, pidInput, n, init, {}); setPrevB(0); setError(""); setScreen("game");
  };

  const handleCellClick = (i) => {
    if (i === 12) return;
    if (checked.has(i)) {
      // Uncheck
      setChecked(p => { const n = new Set(p); n.delete(i); return n; });
      setMeta(p => { const n = {...p}; delete n[i]; return n; });
    } else {
      if (gameMode === "async") {
        setPendingCell(i); setEpInput(""); setTimeInput("");
      } else {
        setChecked(p => { const n = new Set(p); n.add(i); return n; });
        setMeta(p => ({ ...p, [i]: { ep:"", time:"" } }));
      }
    }
  };
  const confirmCell = () => {
    if (pendingCell === null) return;
    setChecked(p => { const n = new Set(p); n.add(pendingCell); return n; });
    setMeta(p => ({ ...p, [pendingCell]: { ep: epInput.trim(), time: timeInput.trim() } }));
    setPendingCell(null);
  };

  // ─── STYLES ──────────────────────────────────────────────────────────────
  const wrap = { minHeight:"100vh", background:bg, color:"#e8e8e8", fontFamily:F, display:"flex", flexDirection:"column", alignItems:"center", padding:"28px 16px 56px", transition:"background 0.5s", position:"relative", overflow:"hidden" };
  const inp = { width:"100%", padding:"11px 14px", borderRadius:"8px", border:"1px solid #2a2a2a", background:"#0e0e0e", color:"#e8e8e8", fontFamily:F, fontSize:"15px", outline:"none", boxSizing:"border-box" };
  const lbl = { fontSize:"11px", color:"#aaa", marginBottom:"7px", display:"block", letterSpacing:"1px", textTransform:"uppercase" };
  const cardWrap = { background:"#ffffff0a", border:"1px solid #ffffff14", borderRadius:"14px", padding:"28px", width:"100%", maxWidth:"460px", zIndex:1, position:"relative" };
  const btn = (a = accent, fill = false) => ({ padding:"11px 22px", borderRadius:"8px", border:`1.5px solid ${a}`, background:fill ? a : "transparent", color:fill ? "#000" : a, fontFamily:F, fontSize:"14px", cursor:"pointer", fontWeight:"600", transition:"all 0.2s" });

  // ─── HOME ────────────────────────────────────────────────────────────────
  if (screen === "home") return (
    <div style={wrap}>
      <link rel="stylesheet" href={FONT_URL} />
      <Grain />
      <style>{`button:hover{filter:brightness(1.12)} input:focus{border-color:#444!important} *{box-sizing:border-box}`}</style>

      <div style={{ textAlign:"center", marginBottom:"28px", zIndex:1, position:"relative" }}>
        <div style={{ fontSize:"10px", letterSpacing:"5px", textTransform:"uppercase", color:accent, marginBottom:"10px", transition:"color 0.5s" }}>Le jeu du canapé</div>
        <h1 style={{ fontSize:"clamp(24px,5vw,42px)", fontWeight:"700", margin:0, color:"#f0f0f0", letterSpacing:"-0.5px" }}>Streaming Bingo</h1>
        <p style={{ color:"#aaa", fontSize:"13px", marginTop:"8px" }}>Repérez les clichés avant les autres</p>
      </div>

      {/* Tabs */}
      <div style={{ display:"flex", gap:"4px", background:"#ffffff08", borderRadius:"10px", padding:"4px", marginBottom:"20px", zIndex:1, position:"relative" }}>
        {[["genres","Par genre"],["shows","Par série"]].map(([t, label]) => (
          <button key={t} onClick={() => setTab(t)} style={{ padding:"8px 20px", borderRadius:"7px", border:"none", background:tab===t ? "#ffffff18" : "transparent", color:tab===t ? "#e8e8e8" : "#aaa", fontFamily:F, fontSize:"13px", fontWeight:"600", cursor:"pointer" }}>{label}</button>
        ))}
      </div>

      {/* Genre pills */}
      {tab === "genres" && (
        <div style={{ display:"flex", flexWrap:"wrap", gap:"8px", justifyContent:"center", maxWidth:"700px", zIndex:1, position:"relative", marginBottom:"28px" }}>
          {GENRES.map(g => (
            <button key={g.id} onClick={() => { setGid(g.id); setTimeout(() => modeRef.current?.scrollIntoView({ behavior:"smooth", block:"start" }), 50); }} style={{ padding:"8px 16px", borderRadius:"999px", cursor:"pointer", fontFamily:F, fontSize:"13px", fontWeight:gid===g.id ? "600" : "400", border:`1.5px solid ${gid===g.id ? g.accent : "#2a2a2a"}`, background:gid===g.id ? `${g.accent}1a` : "#0e0e0e", color:gid===g.id ? g.accent : "#bbb", transition:"all 0.2s" }}>
              {g.emoji} {g.label}
            </button>
          ))}
        </div>
      )}

      {/* Show cards */}
      {tab === "shows" && (
        <>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(130px, 1fr))", gap:"10px", maxWidth:"700px", width:"100%", zIndex:1, position:"relative", marginBottom:"12px" }}>
          {SHOWS.map(g => (
            <button key={g.id} onClick={() => { setGid(g.id); setTimeout(() => modeRef.current?.scrollIntoView({ behavior:"smooth", block:"start" }), 50); }} style={{ borderRadius:"12px", border:`2px solid ${gid===g.id ? g.accent : "#1e1e1e"}`, background:gid===g.id ? `${g.accent}15` : "#0e0e0e", cursor:"pointer", overflow:"hidden", transition:"all 0.2s", padding:0, textAlign:"left" }}>
              {/* Poster or emoji fallback */}
              <ShowPoster show={g} selected={gid===g.id} />
              <div style={{ padding:"8px 10px" }}>
                <div style={{ fontSize:"12px", fontWeight:"600", color:gid===g.id ? g.accent : "#ddd", lineHeight:1.3 }}>{g.label}</div>
                <div style={{ fontSize:"10px", color:"#666", marginTop:"2px" }}>{g.tag}</div>
              </div>
            </button>
          ))}
        </div>
        </>
      )}

      {/* Mode selector */}
      <div ref={modeRef} style={{ zIndex:1, position:"relative", marginBottom:"24px", textAlign:"center", scrollMarginTop:"24px" }}>
        <div style={{ fontSize:"11px", color:"#aaa", letterSpacing:"1px", textTransform:"uppercase", marginBottom:"10px" }}>Mode de jeu</div>
        <div style={{ display:"flex", gap:"8px", justifyContent:"center" }}>
          {[["live","⚡ En direct","Même pièce ou call - pas besoin de noter"],["async","📅 Asynchrone","Chacun regarde de son côté - horodatage requis"]].map(([m, label, desc]) => (
            <button key={m} onClick={() => setMode(m)} style={{ padding:"10px 16px", borderRadius:"10px", border:`1.5px solid ${mode===m ? accent : "#2a2a2a"}`, background:mode===m ? `${accent}15` : "#0a0a0a", cursor:"pointer", fontFamily:F, maxWidth:"200px", textAlign:"left" }}>
              <div style={{ fontSize:"13px", fontWeight:"600", color:mode===m ? accent : "#ddd" }}>{label}</div>
              <div style={{ fontSize:"11px", color:"#888", marginTop:"3px", lineHeight:1.4 }}>{desc}</div>
            </button>
          ))}
        </div>
      </div>

      <div style={{ display:"flex", gap:"12px", flexWrap:"wrap", justifyContent:"center", zIndex:1, position:"relative" }}>
        <button style={btn(accent, true)} onClick={createGame}>Créer une partie</button>
        <button style={btn("#888")} onClick={() => setScreen("join")}>Rejoindre avec un code</button>
      </div>
      {error && <p style={{ color:"#ff6b6b", fontSize:"13px", marginTop:"10px", zIndex:1, position:"relative" }}>{error}</p>}

      <p style={{ fontSize:"11px", color:"#555", textAlign:"center", maxWidth:"500px", lineHeight:1.6, zIndex:1, position:"relative", marginTop:"48px", padding:"0 16px" }}>
        Images provenant de <a href="https://en.wikipedia.org" target="_blank" rel="noopener noreferrer" style={{ color:"#888" }}>Wikipédia</a>. Tous droits sur les titres et visuels appartiennent à leurs détenteurs respectifs. Ce jeu n'a aucune affiliation avec les productions mentionnées.
      </p>
    </div>
  );

  // ─── LOBBY ───────────────────────────────────────────────────────────────
  if (screen === "lobby") {
    const shareText = `Streaming Bingo - ${entry?.label || ""} (${mode === "live" ? "En direct" : "Asynchrone"})\nCode de partie : ${code}\n\nOuvre le jeu, clique Rejoindre, entre le code, choisis ton numéro.`;
    const shareUrl = typeof window !== "undefined" ? window.location.href : "";
    const doShare = async () => {
      if (navigator.share) {
        try { await navigator.share({ title: "Streaming Bingo", text: shareText, url: shareUrl }); } catch {}
      } else {
        navigator.clipboard?.writeText(`${shareText}\n${shareUrl}`).catch(() => {});
        alert("Lien copié dans le presse-papier !");
      }
    };
    return (
      <div style={wrap}>
        <link rel="stylesheet" href={FONT_URL} />
        <Grain />
        <style>{`button:hover{filter:brightness(1.1)} *{box-sizing:border-box}`}</style>
        <div style={{ textAlign:"center", marginBottom:"28px", zIndex:1, position:"relative" }}>
          <div style={{ fontSize:"10px", letterSpacing:"5px", textTransform:"uppercase", color:accent, marginBottom:"8px" }}>{entry?.emoji} {entry?.label}</div>
          <h1 style={{ fontSize:"24px", fontWeight:"700", margin:0, color:"#f0f0f0" }}>Partie créée</h1>
          <div style={{ marginTop:"6px", display:"inline-block", padding:"4px 10px", borderRadius:"999px", background:mode==="live" ? "#ffffff10" : `${accent}20`, border:`1px solid ${mode==="live" ? "#333" : accent+"44"}`, fontSize:"12px", color:mode==="live" ? "#aaa" : accent }}>
            {mode === "live" ? "⚡ En direct" : "📅 Asynchrone"}
          </div>
        </div>
        <div style={cardWrap}>
          <div style={{ marginBottom:"20px" }}>
            <span style={lbl}>Code de la partie</span>
            <div style={{ display:"flex", gap:"10px", alignItems:"center" }}>
              <div style={{ flex:1, textAlign:"center", fontSize:"28px", fontWeight:"700", letterSpacing:"8px", color:accent, background:"#ffffff08", borderRadius:"8px", padding:"14px", textShadow:`0 0 24px ${accent}55` }}>{code}</div>
              <button style={{ ...btn(accent), padding:"12px 16px", minWidth:"80px" }} onClick={() => { navigator.clipboard?.writeText(code).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 2000); }}>{copied ? "✓" : "Copier"}</button>
            </div>
          </div>
          <div style={{ marginBottom:"20px" }}>
            <button onClick={doShare} style={{ ...btn(accent, true), width:"100%", fontSize:"14px" }}>
              Partager avec mes amis
            </button>
            <p style={{ fontSize:"11px", color:"#555", textAlign:"center", marginTop:"6px", lineHeight:1.4 }}>
              Ouvre les options de partage de votre téléphone (WhatsApp, SMS, iMessage...)
            </p>
          </div>
          <div style={{ borderTop:"1px solid #ffffff0e", margin:"20px 0" }} />
          <div style={{ marginBottom:"20px" }}>
            <span style={lbl}>Joueurs connectés ({lobbyPlayers.length})</span>
            <div style={{ display:"flex", gap:"8px", flexWrap:"wrap" }}>
              {lobbyPlayers.length === 0 ? <span style={{ color:"#666", fontSize:"13px" }}>En attente...</span> : lobbyPlayers.map(p => <PlayerBadge key={p.pid} pid={p.pid} name={p.name} />)}
            </div>
          </div>
          <div>
            <span style={lbl}>Je joue en tant que</span>
            <div style={{ display:"flex", gap:"8px", flexWrap:"wrap", marginBottom:"12px" }}>
              {[1,2,3,4,5,6,7,8].map(n => { const taken = lobbyPlayers.map(p=>p.pid).includes(n); return (
                <button key={n} onClick={() => !taken && setPidInput(n)} style={{ width:"40px", height:"40px", borderRadius:"8px", cursor:taken ? "not-allowed" : "pointer", border:`1.5px solid ${pidInput===n ? accent : taken ? "#181818" : "#252525"}`, background:pidInput===n ? `${accent}20` : taken ? "#0d0d0d" : "#111", color:pidInput===n ? accent : taken ? "#333" : "#aaa", fontFamily:F, fontSize:"14px", fontWeight:"600", position:"relative" }}>
                  {taken ? "✕" : n}
                  {taken && <span style={{ position:"absolute", top:2, right:3, fontSize:"7px", color:PC[n-1] }}>●</span>}
                </button>
              ); })}
            </div>
            <input style={{ ...inp, marginBottom:"10px" }} placeholder="Mon prénom (optionnel)" value={nameInput} onChange={e => setNameInput(e.target.value)} onKeyDown={e => e.key === "Enter" && joinFromLobby()} />
            <button style={{ ...btn(accent, true), width:"100%" }} onClick={joinFromLobby}>Jouer avec ma carte</button>
            {error && <p style={{ color:"#ff6b6b", fontSize:"13px", marginTop:"8px" }}>{error}</p>}
          </div>
        </div>
        <button style={{ ...btn("#555"), marginTop:"14px", fontSize:"12px" }} onClick={() => setScreen("home")}>Retour</button>
      </div>
    );
  }

  // ─── JOIN ────────────────────────────────────────────────────────────────
  if (screen === "join") return (
    <div style={wrap}>
      <link rel="stylesheet" href={FONT_URL} />
      <Grain />
      <style>{`button:hover{filter:brightness(1.1)} input:focus{border-color:#444!important} *{box-sizing:border-box}`}</style>
      <div style={{ textAlign:"center", marginBottom:"28px", zIndex:1, position:"relative" }}>
        <div style={{ fontSize:"10px", letterSpacing:"5px", textTransform:"uppercase", color:"#aaa", marginBottom:"8px" }}>Le jeu du canapé</div>
        <h1 style={{ fontSize:"24px", fontWeight:"700", margin:0, color:"#f0f0f0" }}>Rejoindre une partie</h1>
      </div>
      <div style={cardWrap}>
        <div style={{ marginBottom:"20px" }}>
          <span style={lbl}>Code de la partie</span>
          <input style={{ ...inp, letterSpacing:"5px", fontSize:"22px", textAlign:"center", textTransform:"uppercase" }} placeholder="ABC123" value={codeInput} onChange={e => { setCodeInput(e.target.value.toUpperCase().slice(0,6)); setPidInput(null); }} maxLength={6} />
        </div>
        <div style={{ marginBottom:"20px" }}>
          <span style={lbl}>Mon numéro de joueur{joinTaken.length > 0 ? " - ✕ = déjà pris" : ""}</span>
          <div style={{ display:"flex", gap:"8px", flexWrap:"wrap" }}>
            {[1,2,3,4,5,6,7,8].map(n => { const taken = joinTaken.includes(n); return (
              <button key={n} onClick={() => !taken && setPidInput(n)} style={{ width:"44px", height:"44px", borderRadius:"8px", cursor:taken ? "not-allowed" : "pointer", border:`1.5px solid ${pidInput===n ? "#8b5cf6" : taken ? "#181818" : "#252525"}`, background:pidInput===n ? "#8b5cf620" : taken ? "#0a0a0a" : "#111", color:pidInput===n ? "#8b5cf6" : taken ? "#333" : "#bbb", fontFamily:F, fontSize:"15px", fontWeight:"600" }}>
                {taken ? "✕" : n}
              </button>
            ); })}
          </div>
        </div>
        <div style={{ marginBottom:"20px" }}>
          <span style={lbl}>Mon prénom (optionnel)</span>
          <input style={inp} placeholder={`Joueur ${pidInput || 1}`} value={nameInput} onChange={e => setNameInput(e.target.value)} onKeyDown={e => e.key === "Enter" && joinGame()} />
        </div>
        <button style={{ ...btn("#8b5cf6", true), width:"100%" }} onClick={joinGame}>Rejoindre la partie</button>
        {error && <p style={{ color:"#ff6b6b", fontSize:"13px", marginTop:"8px" }}>{error}</p>}
      </div>
      <button style={{ ...btn("#555"), marginTop:"14px", fontSize:"12px" }} onClick={() => setScreen("home")}>Retour</button>
    </div>
  );

  // ─── GAME ────────────────────────────────────────────────────────────────
  if (screen === "game") {
    const myChecked = checked.size - 1;
    const isAsync = gameMode === "async";

    return (
      <div style={{ ...wrap, padding:"12px 10px 40px" }}>
        <link rel="stylesheet" href={FONT_URL} />
        <Grain />
        <style>{`
          @keyframes gp{0%,100%{box-shadow:0 0 6px ${accent}66}50%{box-shadow:0 0 20px ${accent}}}
          @keyframes fall{to{transform:translateY(110vh) rotate(720deg);opacity:0}}
          @keyframes bk{0%,100%{opacity:1}50%{opacity:0.5}}
          @keyframes fadeIn{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:translateY(0)}}
          .bc:hover{transform:scale(1.03)}
          .bc{transition:transform 0.15s,background 0.2s,border-color 0.2s;cursor:pointer;user-select:none}
        `}</style>
        {confetti && <Confetti />}

        {/* Async modal */}
        {pendingCell !== null && (
          <div style={{ position:"fixed", inset:0, background:"#000000cc", zIndex:200, display:"flex", alignItems:"center", justifyContent:"center", padding:"16px" }}>
            <div style={{ background:"#111", border:`1px solid ${accent}`, borderRadius:"14px", padding:"24px", width:"100%", maxWidth:"340px", animation:"fadeIn 0.2s ease" }}>
              <div style={{ fontSize:"13px", color:accent, fontWeight:"600", marginBottom:"4px", textTransform:"uppercase", letterSpacing:"1px" }}>Horodatage</div>
              <div style={{ fontSize:"12px", color:"#aaa", marginBottom:"16px" }}>
                <strong style={{ color:"#ddd" }}>{card[pendingCell]}</strong><br />
                Notez où vous êtes pour que les autres puissent vérifier.
              </div>
              <div style={{ marginBottom:"12px" }}>
                <label style={lbl}>Épisode (ex. S02E04)</label>
                <input style={inp} placeholder="S01E01" value={epInput} onChange={e => setEpInput(e.target.value)} autoFocus />
              </div>
              <div style={{ marginBottom:"20px" }}>
                <label style={lbl}>Moment (ex. 14:32)</label>
                <input style={inp} placeholder="14:32" value={timeInput} onChange={e => setTimeInput(e.target.value)} onKeyDown={e => e.key === "Enter" && confirmCell()} />
              </div>
              <div style={{ display:"flex", gap:"10px" }}>
                <button style={{ ...btn("#555"), flex:1 }} onClick={() => setPendingCell(null)}>Annuler</button>
                <button style={{ ...btn(accent, true), flex:2 }} onClick={confirmCell}>Confirmer</button>
              </div>
            </div>
          </div>
        )}

        {/* Tooltip */}
        {tooltip !== null && meta[tooltip] && (meta[tooltip].ep || meta[tooltip].time) && (
          <div style={{ position:"fixed", top:"50%", left:"50%", transform:"translate(-50%,-50%)", background:"#111", border:`1px solid ${accent}44`, borderRadius:"10px", padding:"14px 18px", zIndex:150, fontSize:"12px", color:"#ddd", pointerEvents:"none", animation:"fadeIn 0.15s ease" }}>
            {meta[tooltip].ep && <div><span style={{ color:accent }}>Épisode</span> {meta[tooltip].ep}</div>}
            {meta[tooltip].time && <div><span style={{ color:accent }}>Moment</span> {meta[tooltip].time}</div>}
          </div>
        )}

        {/* Top bar */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", width:"100%", maxWidth:"680px", marginBottom:"10px", zIndex:1, position:"relative" }}>
          <div>
            <div style={{ fontSize:"10px", color:"#777", letterSpacing:"3px", textTransform:"uppercase" }}>{entry?.emoji} {entry?.label}</div>
            <div style={{ fontSize:"13px", color:accent, fontWeight:"600" }}>{playerName} - Joueur {pid}</div>
          </div>
          <div style={{ textAlign:"right" }}>
            <div style={{ fontSize:"11px", color:"#555" }}>Code <span style={{ color:"#777", letterSpacing:"2px" }}>{code}</span></div>
            <div style={{ fontSize:"10px", color:isAsync ? accent : "#555", marginTop:"2px" }}>{isAsync ? "📅 Asynchrone" : "⚡ En direct"}</div>
          </div>
        </div>

        <div style={{ display:"flex", gap:"12px", width:"100%", maxWidth:"680px", zIndex:1, position:"relative", alignItems:"flex-start", flexDirection: windowW < 520 ? "column" : "row" }}>

          {/* Grille bingo */}
          <div style={{ flex:"1 1 0", minWidth:0 }}>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap: windowW < 520 ? "4px" : "3px", marginBottom:"3px" }}>
              {["B","I","N","G","O"].map(l => <div key={l} style={{ textAlign:"center", fontWeight:"700", fontSize: windowW < 520 ? "clamp(14px,4vw,18px)" : "17px", color:accent, textShadow:`0 0 12px ${accent}66` }}>{l}</div>)}
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap: windowW < 520 ? "4px" : "3px" }}>
              {card.map((trope, i) => {
                const isFree = i === 12, isC = checked.has(i), isB = blines.some(l => l.includes(i));
                const hasMeta = isAsync && meta[i] && (meta[i].ep || meta[i].time);
                return (
                  <div key={i} className="bc"
                    onClick={() => handleCellClick(i)}
                    onMouseEnter={() => isAsync && isC && hasMeta && setTooltip(i)}
                    onMouseLeave={() => setTooltip(null)}
                    style={{ aspectRatio:"1", borderRadius:"6px", border:`1px solid ${isB ? accent : isC ? `${accent}55` : "#242424"}`, background:isFree ? `${accent}1e` : isC ? `${accent}14` : "#0e0e0e", display:"flex", alignItems:"center", justifyContent:"center", padding: windowW < 520 ? "5px 3px" : "4px", textAlign:"center", fontSize: windowW < 520 ? "clamp(9px,2.8vw,11px)" : "clamp(8px,1.4vw,10px)", lineHeight:1.3,
                      // WCAG AA : min 4.5:1 sur fond #0e0e0e
                      color:isFree ? accent : isC ? "#e0e0e0" : "#aaaaaa",
                      fontWeight:isFree || isC ? "600" : "400", cursor:isFree ? "default" : "pointer", animation:isB ? "gp 1.5s ease-in-out infinite" : "none", position:"relative", overflow:"hidden" }}>
                    {isC && !isFree && <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}><div style={{ width:"52%", height:"1.5px", background:accent, opacity:0.5, borderRadius:"1px", transform:"rotate(-8deg)" }} /></div>}
                    {hasMeta && <div style={{ position:"absolute", top:2, right:2, width:"5px", height:"5px", borderRadius:"50%", background:accent, opacity:0.8 }} />}
                    <span style={{ position:"relative", zIndex:1 }}>{trope === "LIBRE" ? "⭐ LIBRE" : trope}</span>
                  </div>
                );
              })}
            </div>
            {isAsync && <div style={{ fontSize:"10px", color:"#666", marginTop:"6px", textAlign:"center" }}>Point coloré = horodatage enregistré - passez dessus pour voir</div>}

            {/* Score */}
            <div style={{ marginTop:"10px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"6px" }}>
              <span style={{ fontSize:"12px", color:"#777" }}>{myChecked}/24</span>
              {blines.length > 0 && (
                <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                  <span style={{ fontSize:"17px", fontWeight:"700", color:accent, animation:"bk 1s ease-in-out infinite" }}>{blines.length === 1 ? "🎉 BINGO !" : `🔥 ${blines.length}x BINGO`}</span>
                  <button onClick={() => setShowReveal(true)} style={{ fontSize:"11px", color:"#000", background:accent, border:"none", borderRadius:"4px", padding:"4px 10px", cursor:"pointer", fontFamily:F, fontWeight:"600" }}>Révéler ma carte</button>
                </div>
              )}
              <button onClick={() => { setCard(makeCard(code, pid, gid)); setChecked(new Set([12])); setMeta({ 12:{ep:"",time:""} }); setPrevB(0); setShowReveal(false); }}
                style={{ fontSize:"11px", color:"#888", background:"none", border:"1px solid #222", borderRadius:"4px", padding:"4px 8px", cursor:"pointer", fontFamily:F }}>
                Nouvelle carte
              </button>
            </div>

            {/* Reveal modal */}
            {showReveal && (
              <div style={{ position:"fixed", inset:0, background:"#000000dd", zIndex:200, display:"flex", alignItems:"center", justifyContent:"center", padding:"16px" }} onClick={() => setShowReveal(false)}>
                <div style={{ background:"#111", border:`1px solid ${accent}44`, borderRadius:"16px", padding:"24px", width:"100%", maxWidth:"500px", maxHeight:"90vh", overflowY:"auto", animation:"fadeIn 0.2s ease" }} onClick={e => e.stopPropagation()}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"16px" }}>
                    <div>
                      <div style={{ fontSize:"11px", color:accent, letterSpacing:"2px", textTransform:"uppercase" }}>Carte de {playerName}</div>
                      <div style={{ fontSize:"16px", fontWeight:"700", color:"#f0f0f0", marginTop:"2px" }}>{entry?.emoji} {entry?.label}</div>
                    </div>
                    <button onClick={() => setShowReveal(false)} style={{ background:"none", border:"none", color:"#777", fontSize:"20px", cursor:"pointer", fontFamily:F }}>✕</button>
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:"4px", marginBottom:"6px" }}>
                    {["B","I","N","G","O"].map(l => <div key={l} style={{ textAlign:"center", fontWeight:"700", fontSize:"14px", color:accent }}>{l}</div>)}
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:"4px" }}>
                    {card.map((trope, i) => {
                      const isFree = i === 12, isC = checked.has(i), isB = blines.some(l => l.includes(i));
                      const m = meta[i];
                      return (
                        <div key={i} style={{ borderRadius:"6px", border:`1px solid ${isB ? accent : isC ? accent+"44" : "#222"}`, background:isB ? `${accent}25` : isC ? `${accent}12` : "#0a0a0a", padding:"6px 4px", textAlign:"center", fontSize:"9px", lineHeight:1.3, color:isFree ? accent : isC ? "#e0e0e0" : "#555", fontWeight:isC ? "600" : "400" }}>
                          {isB && <div style={{ fontSize:"10px", marginBottom:"2px" }}>✓</div>}
                          <div>{trope === "LIBRE" ? "⭐ LIBRE" : trope}</div>
                          {isAsync && isC && m && (m.ep || m.time) && (
                            <div style={{ marginTop:"4px", fontSize:"8px", color:accent, opacity:0.9, borderTop:`1px solid ${accent}33`, paddingTop:"3px" }}>
                              {m.ep && <div>{m.ep}</div>}
                              {m.time && <div>{m.time}</div>}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <p style={{ fontSize:"10px", color:"#555", textAlign:"center", marginTop:"16px", lineHeight:1.5 }}>Cliquez en dehors pour fermer</p>
                </div>
              </div>
            )}
          </div>

          {/* Tableau des scores */}
          <div style={{ width: windowW < 520 ? "100%" : "130px", flexShrink:0, background:"#ffffff05", border:"1px solid #161616", borderRadius:"12px", padding:"12px" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"12px" }}>
              <div style={{ fontSize:"10px", letterSpacing:"3px", textTransform:"uppercase", color:"#555" }}>Live</div>
              {windowW < 520 && <div style={{ fontSize:"10px", color:"#444" }}>rafraîchi toutes les 4s</div>}
            </div>
            {players.length === 0
              ? <div style={{ fontSize:"11px", color:"#444" }}>En attente...</div>
              : <div style={{ display: windowW < 520 ? "flex" : "block", flexWrap:"wrap", gap:"8px" }}>{[...players].sort((a,b) => { const bA=checkBingo(new Set(a.checked)).length, bB=checkBingo(new Set(b.checked)).length; return bB!==bA?bB-bA:b.checked.length-a.checked.length; }).map(p => {
                  const pB = checkBingo(new Set(p.checked)).length, pC = p.checked.length - 1, isMe = p.pid === pid;
                  return (
                    <div key={p.pid} style={{ marginBottom: windowW < 520 ? "0" : "10px", paddingBottom: windowW < 520 ? "0" : "10px", borderBottom: windowW < 520 ? "none" : "1px solid #0e0e0e", background: windowW < 520 ? "#ffffff08" : "transparent", borderRadius: windowW < 520 ? "8px" : "0", padding: windowW < 520 ? "6px 8px" : "0 0 10px 0", minWidth: windowW < 520 ? "80px" : "auto" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:"5px", marginBottom:"4px" }}>
                        <div style={{ width:"7px", height:"7px", borderRadius:"50%", background:PC[p.pid-1], flexShrink:0 }} />
                        <div style={{ fontSize:"11px", color:isMe ? "#e0e0e0" : "#aaa", fontWeight:isMe ? "600" : "400", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{p.name}{isMe ? " (moi)" : ""}</div>
                      </div>
                      <div style={{ height:"3px", background:"#141414", borderRadius:"2px", marginBottom:"4px" }}>
                        <div style={{ height:"100%", borderRadius:"2px", width:`${Math.round((pC/24)*100)}%`, background:PC[p.pid-1], transition:"width 0.5s" }} />
                      </div>
                      <div style={{ fontSize:"10px", color:"#777" }}>{pC}/24{pB > 0 && <span style={{ color:PC[p.pid-1], marginLeft:"4px" }}>· {pB}B</span>}</div>
                    </div>
                  );
                })}</div>
            }
            {windowW >= 520 && <div style={{ fontSize:"9px", color:"#333", textAlign:"center", marginTop:"4px" }}>rafraîchi toutes les 4s</div>}
          </div>
        </div>
      </div>
    );
  }
  return null;
}

// ─── SOUS-COMPOSANTS ─────────────────────────────────────────────────────────
function Grain() { return <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0, opacity:0.28, backgroundImage:"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.1'/%3E%3C/svg%3E\")" }} />; }
function Confetti() {
  const colors = ["#e94560","#8b5cf6","#fb923c","#4ade80","#f472b6","#facc15","#38bdf8","#c084fc"];
  return <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:100 }}>{Array.from({length:50}).map((_,i) => <div key={i} style={{ position:"absolute", left:`${Math.random()*100}%`, top:"-16px", width:`${6+Math.random()*5}px`, height:`${6+Math.random()*5}px`, borderRadius:Math.random()>0.5?"50%":"2px", background:colors[i%colors.length], animation:`fall ${1.2+Math.random()*1.5}s linear forwards`, animationDelay:`${Math.random()*0.6}s` }} />)}</div>;
}
function PlayerBadge({ pid, name }) { return <div style={{ display:"flex", alignItems:"center", gap:"6px", background:"#ffffff07", border:"1px solid #1c1c1c", borderRadius:"999px", padding:"4px 10px" }}><div style={{ width:"7px", height:"7px", borderRadius:"50%", background:PC[pid-1] }} /><span style={{ fontSize:"12px", color:"#bbb" }}>{name}</span></div>; }

function ShowPoster({ show, selected }) {
  const [imgFailed, setImgFailed] = useState(false);
  const borderColor = selected ? show.accent + "44" : "#1a1a1a";
  if (show.poster && !imgFailed) {
    return (
      <div style={{ height:"90px", overflow:"hidden", borderBottom:`1px solid ${borderColor}`, position:"relative", background:show.posterBg || show.bg, display:"flex", alignItems:"center", justifyContent:"center" }}>
        <img
          src={show.poster}
          alt={show.label}
          onError={() => setImgFailed(true)}
          style={{ width:"100%", height:"100%", objectFit:"contain", objectPosition:"center center", display:"block", padding:"8px" }}
        />
      </div>
    );
  }
  return (
    <div style={{ background:`linear-gradient(135deg, ${show.accent}30, ${show.accent}08)`, textAlign:"center", borderBottom:`1px solid ${borderColor}`, height:"90px", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
      <div style={{ fontSize:"28px", marginBottom:"4px" }}>{show.emoji}</div>
      <div style={{ display:"flex", justifyContent:"center", gap:"3px", flexWrap:"wrap" }}>
        {show.art.slice(1).map((e,i) => <span key={i} style={{ fontSize:"11px", opacity:0.5 }}>{e}</span>)}
      </div>
    </div>
  );
}
