// Curriculum. Glosses describe word-family connections; `parts` explain a word's
// history and are not a claim that the pieces add up to its modern meaning.
// hard: [word, modern definition, parts]. impostor: [look-alike word, why it isn't related].
const item = (id,root,meaning,origin,source,words,hard,extra={}) => ({
 id,root,meaning,origin,source,kind:'root',words:words.split(', '),
 hard:hard.map(([word,definition,parts])=>({word,definition,parts})),
 ...extra,
 impostor:extra.impostor&&{word:extra.impostor[0],note:extra.impostor[1]}
});
const prefix = (...args) => ({...item(...args),kind:'prefix'});

const familiar = [
item('spect','spect / spic','look, see','Latin','specere, spectus ‘look at’','inspect, spectator, perspective, suspicious, spectacle',[
 ['circumspect','wary and unwilling to take risks','circum- ‘around’ + spect ‘look’'],
 ['specious','plausible on the surface but actually wrong','from species ‘appearance’, from specere ‘look’'],
 ['perspicacious','quick to notice and understand things','per- ‘through’ + spic ‘look’']],
 {impostor:['expectorate','From ex- ‘out’ + pectus ‘chest’: to cough something up. No looking involved.']}),
item('port','port','carry','Latin','portare ‘carry’','transport, portable, export, deport, report',[
 ['deportment','the way a person stands, moves and behaves','de- + portare: how you carry yourself'],
 ['comport','conduct oneself; behave','com- ‘together’ + port ‘carry’']],
 {impostor:['opportune','From ob- ‘toward’ + portus ‘harbor’: said of a wind blowing toward port. Portus is a different Latin word, though distantly kin to portare.'],
  note:'A porter may be a carrier (portare) or a doorkeeper (porta ‘gate’).'}),
item('dict','dict','say','Latin','dicere, dictus ‘say’','dictate, predict, verdict, contradict, dictionary',[
 ['malediction','a curse','male ‘badly’ + dict ‘say’'],
 ['interdict','a formal ban, especially a church ban on sacraments','inter ‘between’ + dict ‘say’'],
 ['valediction','a formal farewell','vale ‘farewell’ + dict ‘say’']],
 {note:'Verdict is vere ‘truly’ + dictum ‘said’, via Anglo-Norman.'}),
item('scrib','scrib / script','write','Latin','scribere, scriptus ‘write’','describe, manuscript, inscription, prescribe, subscribe',[
 ['proscribe','forbid, especially by law','pro- ‘publicly’ + scribe ‘write’: Romans posted the names of outlaws'],
 ['circumscribe','restrict within narrow limits','circum- ‘around’ + scribe ‘write’: draw a line around']],
 {impostor:['scruple','From scrupulus ‘small sharp stone’: a pebble in the shoe of conscience.']}),
item('ject','ject','throw','Latin','jacere, jactus ‘throw’','eject, inject, project, reject, object, subject',[
 ['abject','wretched and without pride or hope','ab- ‘away’ + ject ‘thrown’: cast off'],
 ['conjecture','an opinion formed on incomplete information','con- ‘together’ + ject ‘throw’']],
 {note:'Jet, jetty and jettison come from the same verb through French.'}),
item('tract','tract','pull, draw','Latin','trahere, tractus ‘draw, drag’','attract, tractor, extract, distract, retract',[
 ['intractable','hard to manage, control or solve','in- ‘not’ + tractabilis ‘handleable’'],
 ['protracted','lasting longer than expected or usual','pro- ‘forward’ + tract ‘drawn’: drawn out']]),
item('aud','aud','hear','Latin','audire ‘hear’','audible, audience, audition, auditorium, audit',[
 ['obeisance','a respectful gesture, such as a bow','from French obéir ‘obey’, from Latin ob- + audire ‘listen to’']],
 {impostor:['audacious','From audax ‘bold’, from audere ‘dare’. Hearing has nothing to do with it.'],
  note:'An audit was originally a hearing: accounts were read aloud.'}),
item('vid','vid / vis','see','Latin','videre, visus ‘see’','visible, vision, evident, video, revise, supervise',[
 ['provident','careful to provide for the future','pro- ‘ahead’ + vid ‘see’'],
 ['invidious','likely to arouse resentment; unfairly discriminating','from invidia ‘envy’: in- ‘upon’ + vid ‘see’, to look at with malice']],
 {impostor:['divide','From dividere ‘separate’, unrelated to seeing. English widow shares its ancient root.']}),
item('rupt','rupt','break','Latin','rumpere, ruptus ‘break’','interrupt, erupt, rupture, corrupt, disrupt',[
 ['abrupt','sudden and unexpected; curt','ab- ‘off’ + rupt ‘broken’'],
 ['irruption','a sudden, forcible entry','in- ‘into’ + rupt ‘break’']],
 {note:'Bankrupt is Italian banca rotta ‘broken bench’; rotta comes from Latin rupta.'}),
item('cred','cred','believe, trust','Latin','credere, creditus ‘believe, trust’','credible, credit, incredulous, creed, credential',[
 ['credulous','too ready to believe things','cred ‘believe’ + -ulous ‘inclined to’'],
 ['credence','acceptance of something as true','from credentia ‘belief’']],
 {note:'A credenza (Italian for ‘belief, trust’) is said to be the sideboard where food was tasted for poison before serving.'}),
item('bene','bene','well, good','Latin','bene ‘well’; bonus ‘good’','benefit, benevolent, benediction, beneficiary, benign',[
 ['beneficent','actively doing good','bene ‘well’ + fic ‘do’'],
 ['benison','a blessing','Old French beneiçun, from Latin benedictio']],
 {impostor:['benighted','Native English be- + night: overtaken by darkness, hence ignorant.']}),
item('mal','mal','bad, badly','Latin','male ‘badly’; malus ‘bad’','malfunction, malice, malign, malady, malpractice',[
 ['malefactor','a person who commits a crime','male ‘badly’ + fac ‘do’'],
 ['malaise','a vague feeling of unease or discomfort','mal ‘bad’ + French aise ‘ease’']],
 {impostor:['malleable','From malleus ‘hammer’: able to be hammered into shape.']}),
item('bio','bio','life','Greek','bios ‘life’','biology, biography, antibiotic, biopsy, biome',[
 ['symbiosis','close interaction between two different organisms','syn ‘together’ + bio ‘life’'],
 ['aerobic','requiring free oxygen','aero ‘air’ + bio ‘life’']],
 {impostor:['biennial','From Latin bi- ‘two’ + annus ‘year’.']}),
item('graph','graph / gram','write, draw','Greek','graphein ‘write, draw’; gramma ‘letter’','autograph, photograph, telegram, grammar, diagram',[
 ['epigraph','a quotation at the start of a book or chapter','epi ‘upon’ + graph ‘write’'],
 ['lexicographer','a compiler of dictionaries','lexikon ‘word-book’ + graph ‘write’']],
 {note:'A graft in gardening traces back to graphion ‘stylus’: the shoot looked like a pencil.'}),
item('phon','phon','sound, voice','Greek','phōnē ‘sound, voice’','telephone, phonetic, microphone, symphony, saxophone',[
 ['cacophony','a harsh, discordant mixture of sounds','kakos ‘bad’ + phon ‘sound’'],
 ['euphonious','pleasing to the ear','eu ‘well’ + phon ‘sound’']],
 {impostor:['phony','Perhaps from fawney, slang for a gilt ring used in a swindle. Not Greek.']}),
item('photo','phot / phos','light','Greek','phōs, phōtos ‘light’','photograph, photosynthesis, photon, phosphorus',[
 ['phosphorescent','glowing without noticeable heat','phos ‘light’ + phor ‘bearing’'],
 ['photophobia','abnormal sensitivity to light','phot ‘light’ + phob ‘fear’']]),
item('tele','tele','far','Greek','tēle ‘far off’','telescope, telephone, television, telegraph',[
 ['telepathy','communication between minds without the known senses','tele ‘far’ + path ‘feeling’'],
 ['telemetry','automatic measurement of data sent from a distance','tele ‘far’ + metr ‘measure’']],
 {impostor:['teleology','From telos ‘end, purpose’: explaining things by their goals. A different Greek root from tēle ‘far’.']}),
item('geo','geo','earth','Greek','gē ‘earth’','geography, geology, geometry, geothermal',[
 ['apogee','the farthest point of an orbit; a high point or climax','apo ‘away from’ + gee ‘earth’'],
 ['geocentric','having the earth as the center','geo ‘earth’ + kentron ‘center’']],
 {note:'Geometry began as ‘earth-measuring’ (land surveying); George is geōrgos ‘earth-worker’, a farmer.'}),
item('hydro','hydr','water','Greek','hydōr ‘water’','hydrate, hydroelectric, dehydrate, hydrant',[
 ['anhydrous','containing no water','an- ‘without’ + hydr ‘water’'],
 ['hydrophobia','extreme fear of water; an old name for rabies','hydr ‘water’ + phob ‘fear’']],
 {cognate:'English water and otter share its ancient root'}),
item('therm','therm','heat','Greek','thermē ‘heat’','thermal, thermometer, thermostat, hypothermia',[
 ['isotherm','a map line joining places of equal temperature','iso ‘equal’ + therm ‘heat’'],
 ['thermocline','a water layer where temperature changes sharply with depth','therm ‘heat’ + klinein ‘slope’']],
 {cognate:'English warm may be distantly related'}),
item('micro','micro','small','Greek','mikros ‘small’','microscope, microbe, microchip, microwave',[
 ['microcosm','a small world that mirrors a larger one','micro ‘small’ + kosmos ‘world, order’']],
 {note:'Kosmos ‘order, arrangement’ also gives cosmetic.'}),
item('auto','auto','self','Greek','autos ‘self’','automatic, autobiography, autonomy, automobile',[
 ['autodidact','a self-taught person','auto ‘self’ + didaskein ‘teach’'],
 ['autopsy','an examination of a body to find the cause of death','auto ‘self’ + opsis ‘sight’: seeing for oneself']],
 {impostor:['autumn','From Latin autumnus, of uncertain origin.']}),
item('chron','chron','time','Greek','chronos ‘time’','chronology, chronic, synchronize, chronicle',[
 ['anachronism','something placed in the wrong historical period','ana ‘back’ + chron ‘time’'],
 ['chronometer','an instrument for keeping highly accurate time','chron ‘time’ + metr ‘measure’']],
 {impostor:['chrome','From chrōma ‘color’: chromium forms brightly colored compounds.']}),
item('path','path','feeling, suffering','Greek','pathos ‘suffering, feeling’','sympathy, empathy, pathology, pathetic, psychopath',[
 ['apathy','lack of interest or concern','a- ‘without’ + path ‘feeling’'],
 ['antipathy','a deep-seated dislike','anti ‘against’ + path ‘feeling’']],
 {impostor:['pathway','English path is Germanic (perhaps an early loan from Iranian), unrelated to Greek pathos.']})
];

const latin = [
item('cad','cad / cas / cid','fall','Latin','cadere, casus ‘fall’','decadent, occasion, incident, accident, cascade, casualty',[
 ['deciduous','shedding its leaves annually','de- ‘down’ + cid ‘fall’'],
 ['occidental','relating to the West','ob- ‘toward’ + cid ‘fall’: where the sun goes down'],
 ['recidivist','a convicted criminal who reoffends','re- ‘back’ + cid ‘fall’']],
 {impostor:['decide','From de- ‘off’ + caedere ‘cut’, a separate root: to decide is to cut off the alternatives.'],
  note:'An occasion is something that falls your way; a case is how things fall out.'}),
item('cis','cis / cid','cut, kill','Latin','caedere, caesus ‘cut, kill’','incision, precise, concise, decide, homicide, pesticide',[
 ['excise','cut out or remove','ex- ‘out’ + cis ‘cut’'],
 ['incisive','sharply clear and analytical','in- ‘into’ + cis ‘cut’'],
 ['fratricide','the killing of one’s brother','frater ‘brother’ + cid ‘kill’']],
 {impostor:['deciduous','From cadere ‘fall’: the leaves fall; nobody cuts them.'],
  note:'Concise is ‘cut short’; precise is ‘cut off in front’, trimmed to exactly what is needed.'}),
item('ced','ced / ceed / cess','go, yield','Latin','cedere, cessus ‘go; give way’','precede, recede, exceed, proceed, concede, process, access',[
 ['accede','agree to a demand or request','ad- ‘to’ + ced ‘yield’'],
 ['antecedent','a thing that comes before another','ante ‘before’ + ced ‘go’'],
 ['abscess','a swollen pocket of pus','abs- ‘away’ + cess ‘go’: bad humors were thought to leave the body there']],
 {impostor:['assess','From ad- + sedere ‘sit’: originally to sit beside a judge, fixing taxes.'],
  note:'Necessary is probably ne- ‘not’ + cess ‘go away’: there is no getting away from it.'}),
item('sed','sed / sid / sess','sit','Latin','sedere, sessus ‘sit’','sediment, preside, reside, session, sedentary, subside',[
 ['assiduous','showing great care and perseverance','ad- ‘at’ + sid ‘sit’: sitting at a task'],
 ['insidious','spreading gradually and subtly, with harmful effects','from insidiae ‘ambush’: in- + sid ‘sit’, lying in wait'],
 ['supersede','take the place of something older','super ‘above’ + sed ‘sit’']],
 {impostor:['sedition','From sed- ‘apart’ + itio ‘a going’: a breaking away, revolt.'],
  cognate:'English sit, seat and settle share its ancient root',
  note:'Supersede is often misspelled -cede. It is from sedere ‘sit’, not cedere ‘go’.'}),
item('fer','fer / lat','carry, bear','Latin','ferre, latus ‘carry, bear’','transfer, refer, infer, fertile, relate, translate',[
 ['proliferate','increase rapidly in number','proles ‘offspring’ + fer ‘bear’'],
 ['vociferous','loud and insistent','vox ‘voice’ + fer ‘carry’'],
 ['oblation','an offering to a god','ob- ‘toward’ + lat ‘carried’']],
 {impostor:['ferocious','From ferox ‘fierce’, from ferus ‘wild’.'],
  cognate:'English bear (as in bear a load) and Greek pherein',
  note:'Latus came from an unrelated stem, much as go took went.'}),
item('mitt','mit / miss','send, let go','Latin','mittere, missus ‘send, let go’','transmit, dismiss, mission, permit, admit, missile',[
 ['intermittent','stopping and starting at intervals','inter ‘between’ + mitt ‘let go’'],
 ['remiss','negligent in one’s duty','re- ‘back’ + miss ‘let go’: slackened'],
 ['manumission','release from slavery','manus ‘hand’ + miss ‘let go’']],
 {impostor:['mistake','Old Norse mis- ‘wrongly’ + taka ‘take’.'],
  note:'The church Mass is usually traced to the dismissal Ite, missa est.'}),
item('pend','pend / pens / pond','hang, weigh, pay','Latin','pendēre ‘hang’; pendere, pensus ‘weigh, pay’','pendant, suspend, depend, pension, expense, compensate, ponder',[
 ['pensive','engaged in serious thought','from pensare ‘weigh, consider’'],
 ['propensity','a natural tendency to behave a certain way','pro- ‘forward’ + pens ‘hang’'],
 ['appendage','a part attached to something larger','ad- ‘to’ + pend ‘hang’']],
 {impostor:['penitent','From paenitere ‘regret’. No hanging or weighing.'],
  note:'Weighing out metal was paying: a pension was a payment. Spend descends from expendere.'}),
item('ped','ped / pod','foot','Latin & Greek','Latin pes, pedis; Greek pous, podos ‘foot’','pedestrian, pedal, impede, podium, tripod, octopus',[
 ['antipodes','places on the exact opposite side of the globe','anti ‘opposite’ + pod ‘feet’'],
 ['expedite','speed up a process','ex- ‘out’ + ped ‘foot’: free the feet from fetters'],
 ['impediment','an obstruction or hindrance','in- ‘in’ + ped ‘foot’: shackle the feet']],
 {impostor:['pediatric','From Greek pais, paidos ‘child’ + iatros ‘healer’. Pedagogue is a child-leader, too.'],
  cognate:'English foot, from the same Indo-European word',
  note:'Pedigree is French pied de grue ‘crane’s foot’, from the branching marks on family trees.'}),
item('sequ','sequ / secut / sue','follow','Latin','sequi, secutus ‘follow’','sequel, sequence, consequence, persecute, execute, pursue',[
 ['obsequious','excessively eager to please or obey','ob- ‘toward’ + sequ ‘follow’'],
 ['non sequitur','a conclusion that does not follow from what preceded it','Latin ‘it does not follow’']],
 {impostor:['sequin','Via Italian zecchino, a Venetian gold coin, from Arabic sikka ‘coin die’.'],
  note:'Through French, sequi became sue, suit and pursue.'}),
item('loqu','loqu / locut','speak','Latin','loqui, locutus ‘speak’','eloquent, colloquial, soliloquy, ventriloquist, circumlocution, interlocutor',[
 ['obloquy','strong public condemnation','ob- ‘against’ + loqu ‘speak’'],
 ['grandiloquent','pompous or extravagant in language','grandis ‘great’ + loqu ‘speak’'],
 ['loquacious','tending to talk a great deal','loqu ‘speak’ + -acious ‘inclined to’']],
 {impostor:['location','From locus ‘place’.']}),
item('voc','voc / vok','call, voice','Latin','vocare ‘call’; vox, vocis ‘voice’','vocal, invoke, provoke, revoke, advocate, vocation, vocabulary',[
 ['equivocate','use ambiguous language to avoid committing oneself','aequus ‘equal’ + voc ‘call’: one name that fits two things equally'],
 ['convoke','call together for a formal meeting','con- ‘together’ + vok ‘call’'],
 ['irrevocable','impossible to change or reverse','in- ‘not’ + re- ‘back’ + voc ‘call’']],
 {impostor:['avocado','From Nahuatl ahuacatl, reshaped by Spanish speakers.']}),
item('curr','cur / curs / cours','run','Latin','currere, cursus ‘run’','current, occur, concur, excursion, courier, curriculum',[
 ['cursory','hasty and therefore not thorough','curs ‘run’: done on the run'],
 ['precursor','a forerunner that paves the way for a later development','prae ‘before’ + curs ‘run’'],
 ['discursive','moving from topic to topic','dis- ‘apart’ + curs ‘run’']],
 {impostor:['curate','From cura ‘care’: a curate has the cure (care) of souls.']}),
item('vert','vert / vers','turn','Latin','vertere, versus ‘turn’','convert, reverse, divert, versatile, anniversary, adversary, universe',[
 ['averse','having a strong dislike or opposition','ab- ‘away’ + vers ‘turned’'],
 ['subvert','undermine an established system or institution','sub- ‘under’ + vert ‘turn’'],
 ['tergiversate','repeatedly change one’s stated position','tergum ‘back’ + vers ‘turn’: turn one’s back']],
 {impostor:['covert','From Old French covert ‘covered’, from Latin cooperire.'],
  note:'Verse is a ‘turning’, like a plow at the end of a furrow. Prose is from prorsus ‘straight ahead’.'}),
item('plic','plic / plex / ply','fold','Latin','plicare ‘fold’; plectere ‘plait’','complicate, implicit, explicit, duplicate, complex, perplex, apply',[
 ['supplicate','ask or beg humbly','sub- ‘under’ + plic ‘fold, bend’ (probably): bend down'],
 ['explicate','analyze and explain in detail','ex- ‘out’ + plic ‘fold’: unfold'],
 ['complicit','involved with others in wrongdoing','com- ‘together’ + plic ‘fold’']],
 {impostor:['complacent','From com- + placere ‘please’: pleased with oneself.'],
  note:'Simple is ‘one fold’ (sim-plex); duplicity is ‘two-foldness’.'}),
item('ten','ten / tin / tain','hold','Latin','tenere, tentus ‘hold’','tenant, retain, contain, sustain, continent, tenure, abstain',[
 ['tenacious','keeping a firm grip; persistent','ten ‘hold’ + -acious ‘inclined to’'],
 ['pertinacious','holding to an opinion or course with obstinacy','per- ‘thoroughly’ + tin ‘hold’'],
 ['untenable','unable to be defended against attack or objection','un- + ten ‘hold’']],
 {impostor:['tender','In the sense ‘soft’, from tener ‘delicate’: a separate Latin word, though perhaps from the same ancient root.'],
  note:'Content is both what is held in and the feeling of being held together, satisfied.'}),
item('tend','tend / tens / tent','stretch','Latin','tendere, tensus or tentus ‘stretch’','extend, tension, intend, pretend, attention, contend',[
 ['ostensible','stated or appearing to be true, but not necessarily so','ob- ‘before’ + tens ‘stretched’: held out to view'],
 ['portent','a sign of something momentous about to happen','por- ‘forth’ + tent ‘stretched’'],
 ['distend','swell outward from internal pressure','dis- ‘apart’ + tend ‘stretch’']],
 {impostor:['tenacious','From tenere ‘hold’, a neighbor of tendere but a different verb.'],
  note:'Attention is stretching your mind toward something.'}),
item('pon','pon / pos / pound','put, place','Latin','ponere, positus ‘put, place’','component, opponent, postpone, deposit, exponent, positive, compound',[
 ['apposite','apt in the circumstances','ad- ‘to’ + posit ‘placed’: put alongside'],
 ['propound','put forward an idea for consideration','pro- ‘forward’ + pon ‘put’'],
 ['repository','a place where things are stored','re- ‘back’ + pos ‘put’']],
 {impostor:['posthumous','From postumus ‘last-born’. The h crept in through a false link with humus ‘earth’.']}),
item('cap','cap / cep / cip / ceive','take, seize','Latin','capere, captus ‘take, seize’','capture, capable, accept, receive, participate, intercept',[
 ['precept','a general rule meant to regulate conduct','prae ‘before’ + cep ‘take’'],
 ['incipient','beginning to show itself, often of something unwelcome','in- ‘on’ + cip ‘take’: take up, begin'],
 ['percipient','perceptive, especially of others’ feelings','per- ‘thoroughly’ + cip ‘seize’']],
 {impostor:['capital','From caput, capitis ‘head’: the head city, the head sum.'],
  note:'Recipe is Latin for ‘take!’, the first word of old prescriptions.'}),
item('fac','fac / fec / fic','make, do','Latin','facere, factus ‘make, do’','factory, effect, sufficient, artifice, facsimile, infection, manufacture',[
 ['efficacious','successful in producing the intended result','ex- ‘out’ + fic ‘make’'],
 ['facile','superficial; achieved too easily','from facilis ‘doable’'],
 ['soporific','tending to induce sleep','sopor ‘sleep’ + fic ‘make’']],
 {impostor:['fiction','From fingere ‘shape, invent’, also behind figure and feign.'],
  note:'Feat, feature and the verb ending -fy (clarify) all trace back here.'}),
item('gen','gen / gn','birth, kind','Latin','gignere, genitus ‘beget’; genus ‘birth, kind’','generate, genre, progeny, gentle, genital, indigenous, ingenious',[
 ['congenital','present from birth','con- ‘with’ + gen ‘born’'],
 ['ingenuous','innocent, frank and unsuspecting','from ingenuus ‘native, freeborn’'],
 ['progenitor','an ancestor or originator','pro- ‘forth’ + gen ‘beget’']],
 {impostor:['genuflect','From genu ‘knee’ + flectere ‘bend’.'],
  cognate:'English kin and kind; Greek genos',
  note:'Ingenious (clever, from ingenium ‘talent’) and ingenuous (artless) are different words from the same root.'}),
item('grad','grad / gress / gred','step, go','Latin','gradi, gressus ‘step’; gradus ‘a step’','gradual, graduate, progress, aggressive, digress, ingredient, degree',[
 ['retrograde','moving backward or reverting to a worse state','retro ‘backward’ + grad ‘step’'],
 ['egress','a way out; the act of leaving','e- ‘out’ + gress ‘go’'],
 ['transgress','go beyond a limit; violate a rule','trans ‘across’ + gress ‘step’']],
 {impostor:['gregarious','From grex, gregis ‘flock’.'],
  note:'An ingredient is literally something that goes in.'}),
item('greg','greg','flock, herd','Latin','grex, gregis ‘flock’','congregate, segregate, aggregate, congregation',[
 ['egregious','outstandingly bad; shocking','e- ‘out of’ + greg ‘flock’: once a compliment, standing out from the herd'],
 ['gregarious','fond of company; living in groups','greg ‘flock’ + -arious']],
 {impostor:['Gregorian','From the name Gregory, Greek Grēgorios ‘watchful’.']}),
item('junct','junct / jug / join','join, yoke','Latin','jungere, junctus ‘join’; jugum ‘yoke’','junction, conjunction, juncture, adjunct, join, joint',[
 ['injunction','an authoritative order, especially from a court','in- ‘on’ + junct ‘join’: enjoin'],
 ['conjugal','relating to marriage','con- ‘together’ + jug ‘yoke’'],
 ['subjugate','bring under complete control','sub- ‘under’ + jug ‘yoke’']],
 {impostor:['jungle','From Hindi jangal ‘wasteland, forest’.'],
  cognate:'English yoke'}),
item('leg','leg / lect / lig','choose, gather, read','Latin','legere, lectus ‘gather, choose, read’','collect, select, elect, lecture, legible, intelligent, elegant',[
 ['predilection','a special liking for something','prae ‘before’ + di- + lect ‘choose’'],
 ['sacrilege','violation of something held sacred','sacer ‘sacred’ + leg ‘gather’: a temple robber'],
 ['negligent','failing to take proper care','neg- ‘not’ + lig ‘pick up’']],
 {impostor:['legislate','From lex, legis ‘law’, a different Latin word; whether it is distantly related to legere is disputed.']}),
item('mor','mor / mort','death','Latin','mors, mortis ‘death’; mori ‘die’','mortal, immortal, mortify, mortgage, postmortem',[
 ['moribund','at the point of death; in terminal decline','mori ‘die’ + -bundus'],
 ['amortize','gradually write off a cost or pay off a debt','Old French amortir ‘deaden’']],
 {impostor:['moral','From mos, moris ‘custom’.'],
  note:'A mortgage is Old French for ‘dead pledge’: it dies when the debt is paid, or when payment fails.'}),
item('nasc','nasc / nat','be born','Latin','nasci, natus ‘be born’','native, nation, nature, prenatal, innate, renaissance',[
 ['nascent','just beginning to exist','nasc ‘be born’'],
 ['cognate','related by origin','co- ‘together’ + gnatus, old form of natus ‘born’']],
 {impostor:['natatorium','From natare ‘swim’: an indoor pool.'],
  note:'Puny is French puis né ‘born later’: a younger son.'}),
item('solv','solv / solut','loosen, release','Latin','solvere, solutus ‘loosen’','solve, dissolve, solution, absolve, resolute, soluble',[
 ['dissolute','lacking moral restraint','dis- ‘apart’ + solut ‘loosened’'],
 ['insolvent','unable to pay one’s debts','in- ‘not’ + solv ‘release (a debt)’'],
 ['absolution','formal release from guilt or obligation','ab- ‘from’ + solut ‘loosened’']],
 {impostor:['solitude','From solus ‘alone’.'],
  cognate:'Greek lyein ‘loosen’ (lys) is a relative'}),
item('sta','sta / stat / sist / stit','stand','Latin','stare ‘stand’; sistere ‘set, stand’','stable, statue, status, insist, resist, persist, obstacle, institute',[
 ['obstinate','stubbornly refusing to change one’s mind','ob- ‘against’ + stin, a form of the stand root'],
 ['interstice','a small gap between things','inter ‘between’ + sist ‘stand’'],
 ['destitute','lacking the basic necessities of life','de- ‘away’ + stitut ‘set’: abandoned']],
 {impostor:['stagnant','From stagnum ‘pool’.'],
  cognate:'English stand and stead; Greek histanai'}),
item('vinc','vinc / vict','conquer','Latin','vincere, victus ‘conquer’','victory, convince, invincible, evict, convict',[
 ['evince','reveal the presence of a quality or feeling','e- ‘out’ + vinc ‘conquer’: prove'],
 ['vanquish','defeat thoroughly','Old French venquir, from vincere']],
 {impostor:['vicinity','From vicinus ‘neighbor’.'],
  note:'To convince was first to overcome in argument.'}),
item('fid','fid / fy','trust, faith','Latin','fidere ‘trust’; fides ‘faith’','confide, fidelity, infidel, confident, affidavit',[
 ['perfidious','deceitful and untrustworthy','per- ‘through, away’ + fid ‘faith’: faith broken'],
 ['diffident','shy from a lack of self-confidence','dis- ‘not’ + fid ‘trust’'],
 ['fiduciary','involving trust, especially over money','fiducia ‘trust’']],
 {impostor:['fiddle','From Old English fithele.'],
  note:'Defy is from Latin dis- ‘away’ + fid: to renounce faith or allegiance.'}),
item('luc','luc / lum','light','Latin','lux, lucis ‘light’; lumen ‘light’','lucid, elucidate, translucent, illuminate, luminous',[
 ['pellucid','translucently clear; easy to understand','per- ‘through’ + luc ‘shine’'],
 ['lucubration','laborious study, especially at night','from lucubrare ‘work by lamplight’']],
 {impostor:['lucre','From lucrum ‘profit’.'],
  note:'Lucifer is ‘light-bearer’: lux + fer.'}),
item('pung','pung / punct / poign','prick, point','Latin','pungere, punctus ‘prick’','pungent, punctual, puncture, punctuation, point',[
 ['compunction','a feeling of guilt that stops one doing wrong','com- (intensive) + punct ‘prick’'],
 ['expunge','erase or remove completely','ex- ‘out’ + pung ‘prick’: scribes dotted words to delete them'],
 ['poignant','evoking a keen sense of sadness','French, from pungere ‘prick’']],
 {impostor:['pugnacious','From pugnare ‘fight’, from pugnus ‘fist’: a different Latin word, though possibly from the same ancient ‘prick’ root.']})
];

const greek = [
item('log','log / logy','word, reason, study','Greek','logos ‘word, reason, account’; legein ‘speak’','logic, dialogue, apology, analogy, prologue',[
 ['eulogy','a speech of praise, especially for someone who has died','eu ‘well’ + log ‘word’'],
 ['neologism','a newly coined word or expression','neo ‘new’ + log ‘word’'],
 ['tautology','saying the same thing twice in different words','tauto ‘the same’ + log ‘word’']],
 {impostor:['logbook','English log ‘piece of wood’: sailors measured speed with a log on a line.']}),
item('arch','arch','rule, first','Greek','archein ‘begin, rule’; archē ‘beginning, rule’','monarchy, anarchy, archbishop, archaic, archive, hierarchy',[
 ['oligarchy','government by a small group','oligoi ‘few’ + arch ‘rule’'],
 ['archetype','an original model; a typical example','arch ‘first’ + typos ‘stamp’']],
 {impostor:['archery','From Latin arcus ‘bow’.'],
  note:'‘First’ and ‘rule’ were one idea: whoever goes first leads.'}),
item('crat','crat / cracy','power, rule','Greek','kratos ‘power, strength’','democracy, aristocrat, bureaucracy, autocrat, technocrat',[
 ['plutocracy','government by the wealthy','ploutos ‘wealth’ + cracy'],
 ['gerontocracy','government by old people','gerōn ‘old man’ + cracy'],
 ['kleptocracy','government by those who steal from the public','kleptēs ‘thief’ + cracy']],
 {impostor:['crater','From kratēr ‘mixing bowl’, for wine and water.']}),
item('dem','dem','people','Greek','dēmos ‘the people, district’','democracy, epidemic, pandemic, demographic',[
 ['demagogue','a leader who exploits popular prejudice','dēm ‘people’ + agōgos ‘leading’'],
 ['endemic','regularly found among a particular people or area','en ‘in’ + dēm ‘people’']],
 {impostor:['demolish','From Latin de- + moliri ‘build’: to un-build.']}),
item('anthrop','anthrop','human','Greek','anthrōpos ‘human being’','anthropology, philanthropy, anthropoid, Anthropocene',[
 ['anthropomorphic','attributing human traits to non-humans','anthrop ‘human’ + morph ‘form’'],
 ['lycanthropy','the supernatural transformation of a person into a wolf','lykos ‘wolf’ + anthrop ‘human’'],
 ['misanthrope','a person who dislikes humankind','misein ‘hate’ + anthrop ‘human’']],
 {impostor:['anthracite','From anthrax ‘coal’ (also the source of the disease’s name, from its black sores).']}),
item('morph','morph','form, shape','Greek','morphē ‘form, shape’','metamorphosis, morphology, polymorphic, morpheme',[
 ['amorphous','without a clear shape or form','a- ‘without’ + morph ‘form’'],
 ['zoomorphic','having or representing an animal form','zōon ‘animal’ + morph ‘form’']]),
item('phil','phil / phile','love','Greek','philos ‘loving, dear’','philosophy, philanthropy, bibliophile, philharmonic',[
 ['philately','stamp collecting','phil + ateleia ‘exemption from tax’: a stamp showed postage was prepaid'],
 ['philology','the study of language in historical texts','phil ‘love’ + log ‘word’']],
 {impostor:['philistine','From the biblical Philistines, a people of the coast of Canaan.']}),
item('soph','soph','wise, wisdom','Greek','sophos ‘wise’; sophia ‘wisdom’','philosophy, sophisticated, sophomore, theosophy',[
 ['sophistry','clever but deliberately misleading argument','from the Sophists, paid teachers of rhetoric'],
 ['sophomoric','pretentious and immature','from sophomore, earlier sophumer ‘arguer’ (sophism); the ‘wise fool’ reading, sophos + mōros, is folk etymology that shaped the spelling']],
 {impostor:['sofa','From Arabic ṣuffa ‘bench’.']}),
item('the','the / theo','god','Greek','theos ‘god’','theology, atheist, monotheism, pantheon, enthusiasm',[
 ['apotheosis','elevation to divine status; the perfect embodiment of something','apo + theos: making a god of'],
 ['theodicy','a defense of God’s goodness despite evil','theos ‘god’ + dikē ‘justice’']],
 {impostor:['theory','From theōria ‘viewing, contemplation’, a spectator’s word.'],
  note:'Enthusiasm is en-theos: having a god within.'}),
item('gno','gno / gnos','know','Greek','gignōskein ‘know’; gnōsis ‘knowledge’','diagnosis, prognosis, agnostic, gnostic',[
 ['prognosticate','foretell or prophesy','pro ‘before’ + gnos ‘know’'],
 ['gnomic','expressed in short, pithy maxims','gnōmē ‘judgment, maxim’'],
 ['physiognomy','facial features, especially as a supposed guide to character','physis ‘nature’ + gnōmōn ‘interpreter’']],
 {impostor:['gnaw','From Old English gnagan.'],
  cognate:'English know; Latin (g)noscere, as in cognition',
  note:'Agnostic was coined by T. H. Huxley in 1869.'}),
item('dox','dox / dog','opinion, belief','Greek','doxa ‘opinion, glory’; dokein ‘seem’','orthodox, paradox, dogma, doxology',[
 ['heterodox','not conforming to accepted doctrine','hetero ‘other’ + dox ‘opinion’'],
 ['dogmatic','asserting opinions as undeniably true','dogma ‘opinion, decree’']],
 {impostor:['dogged','From English dog: persistent as a dog.']}),
item('phan','phan / phen / phant','show, appear','Greek','phainein ‘show’; phainesthai ‘appear’','phenomenon, phantom, fantasy, emphasis',[
 ['epiphany','a sudden revealing insight','epi ‘upon’ + phan ‘show’'],
 ['diaphanous','light, delicate and translucent','dia ‘through’ + phan ‘show’'],
 ['hierophant','an interpreter of sacred mysteries','hieros ‘sacred’ + phan ‘show’']],
 {impostor:['pheasant','From Phasis, a river in the Caucasus where the bird was found.']}),
item('nym','nym / onym','name','Greek','onyma, dialect form of onoma ‘name’','synonym, antonym, anonymous, pseudonym, acronym',[
 ['eponym','a person after whom something is named','epi ‘upon’ + onym ‘name’'],
 ['patronymic','a name derived from one’s father','patēr ‘father’ + onym ‘name’'],
 ['toponym','a place name','topos ‘place’ + onym ‘name’']],
 {impostor:['nymph','From nymphē ‘bride, young woman’.'],
  cognate:'English name; Latin nomen'}),
item('chrom','chrom','color','Greek','chrōma ‘color’','chrome, monochrome, chromosome, chromatic',[
 ['achromatic','without color','a- ‘without’ + chrom ‘color’'],
 ['chromatography','separating a mixture by passing it through a medium','chrom ‘color’ + graph ‘write’: early runs separated plant pigments']],
 {impostor:['chronic','From chronos ‘time’: lasting a long time.'],
  note:'Chromosomes were named for how readily they absorb dyes.'}),
item('tom','tom','cut','Greek','temnein ‘cut’; tomē ‘a cutting’','atom, anatomy, appendectomy, tome, tomography',[
 ['dichotomy','a division into two opposed parts','dicha ‘in two’ + tom ‘cut’'],
 ['epitome','a perfect example; a summary','epi ‘upon’ + tom ‘cut’: cut short']],
 {impostor:['tomb','From tymbos ‘burial mound’.'],
  note:'An atom is ‘uncuttable’; a tome was a volume cut from a larger work.'}),
item('trop','trop','turn','Greek','tropos ‘a turn’; trepein ‘turn’','tropic, trophy, entropy, heliotrope',[
 ['trope','a figure of speech; a recurring motif','tropos ‘a turn’ of phrase'],
 ['phototropism','growth toward or away from light','phot ‘light’ + trop ‘turn’']],
 {impostor:['atrophy','From a- ‘without’ + trophē ‘nourishment’.'],
  note:'The tropics are where the sun ‘turns’ at the solstices; a trophy marked where an enemy turned to flee.'}),
item('pan','pan / pant','all','Greek','pas, pantos ‘all’','panorama, pandemic, pantheon, pantomime',[
 ['panoply','a complete or impressive array','pan ‘all’ + hopla ‘arms’: full armor'],
 ['pandemonium','wild and noisy disorder','Milton’s capital of Hell: pan ‘all’ + daimōn ‘spirit’'],
 ['panacea','a remedy for all difficulties','pan ‘all’ + akos ‘cure’']],
 {impostor:['pantry','From Old French paneterie, from Latin panis ‘bread’.']}),
item('homo','homo / homeo','same','Greek','homos ‘same’; homoios ‘like’','homonym, homophone, homologous, homogenize',[
 ['homogeneous','of the same kind throughout','homo ‘same’ + genos ‘kind’'],
 ['homeostasis','maintenance of stable internal conditions','homeo ‘similar’ + stasis ‘standing’']],
 {impostor:['homicide','From Latin homo ‘human being’ + -cide ‘killing’.'],
  note:'The usual opposite is hetero- ‘other’: heterodox, heterogeneous.'}),
item('lys','lys / lyt','loosen, dissolve','Greek','lyein ‘loosen’','analysis, paralysis, catalyst, electrolysis',[
 ['hydrolysis','chemical breakdown by reaction with water','hydr ‘water’ + lys ‘loosen’'],
 ['dialysis','filtering blood through a membrane','dia ‘through’ + lys ‘loosen’']],
 {impostor:['lyric','From lyra ‘lyre’: words to be sung to the lyre.'],
  cognate:'Latin solvere; English lose and loose are distant relatives'}),
item('phag','phag','eat','Greek','phagein ‘eat’','esophagus, bacteriophage, phagocyte, autophagy',[
 ['sarcophagus','a stone coffin','sarx ‘flesh’ + phag ‘eat’: the limestone was said to consume bodies'],
 ['dysphagia','difficulty in swallowing','dys ‘bad’ + phag ‘eat’'],
 ['anthropophagy','cannibalism','anthrop ‘human’ + phag ‘eat’']])
];

const prefixes = [
prefix('ad','ad- (ac-, af-, al-, ap-, as-, at-…)','to, toward','Latin','ad ‘to’','adapt, accept, affirm, allude, appear, assist, attract',[
 ['accretion','growth by gradual accumulation','ad- ‘to’ + cret ‘grow’'],
 ['attenuate','reduce in force, value or thickness','ad- ‘to’ + tenuis ‘thin’']],
 {impostor:['adder','Old English nǣdre: ‘a nadder’ was misheard as ‘an adder’.'],
  note:'Ad- usually takes the shape of the next consonant. Assimilate is itself ad- + similis.'}),
prefix('con','con- (co-, col-, com-, cor-)','with, together','Latin','com, cum ‘with’','connect, cooperate, collect, compose, correct',[
 ['collusion','secret cooperation in order to deceive','col- ‘together’ + ludere ‘play’'],
 ['commiserate','express sympathy','com- ‘with’ + miser ‘wretched’'],
 ['corroborate','confirm or give support to','cor- (intensive) + robur ‘strength’']],
 {impostor:['condor','From Quechua kuntur.'],
  note:'Often just an intensifier: conserve, convict.'}),
prefix('ob','ob- (o-, oc-, of-, op-)','toward, against, in the way','Latin','ob ‘toward, against’','object, obstacle, occur, offend, oppose, omit',[
 ['obdurate','hardened against persuasion or pity','ob- (intensive) + durus ‘hard’'],
 ['obviate','remove a need or difficulty in advance','from obviam ‘in the way’'],
 ['obtrude','impose oneself or one’s ideas without invitation','ob- ‘toward’ + trudere ‘thrust’']],
 {impostor:['oboe','From French hautbois ‘high wood’.']}),
prefix('ex','ex- (e-, ef-)','out, thoroughly','Latin','ex ‘out of’','exit, export, emit, evade, effect, exhaust',[
 ['exculpate','clear someone from blame','ex- ‘out’ + culpa ‘blame’'],
 ['extirpate','destroy completely; root out','ex- ‘out’ + stirps ‘stem, root’'],
 ['effulgent','shining brilliantly','ex- ‘out’ + fulgere ‘shine’']]),
prefix('in-not','in- (i-, il-, im-, ir-)','not','Latin','in- ‘not’','inactive, illegal, impossible, irregular, ignoble',[
 ['ineffable','too great to be expressed in words','in- ‘not’ + effabilis ‘utterable’'],
 ['inexorable','impossible to stop or prevent','in- ‘not’ + exorare ‘prevail on by pleading’'],
 ['impecunious','having little or no money','in- ‘not’ + pecunia ‘money’']],
 {impostor:['inflammable','Here in- means ‘into’: inflammable means flammable.'],
  note:'Invaluable is in- ‘not’ + valuable in its old sense ‘able to be valued’: too precious to price.'}),
prefix('in-into','in- (il-, im-, ir-)','in, into, on','Latin','in ‘in, into’','include, invade, illuminate, import, irrigate, inspire',[
 ['imbibe','drink; absorb ideas','in- ‘in’ + bibere ‘drink’'],
 ['incarcerate','imprison','in- ‘in’ + carcer ‘prison’'],
 ['inculcate','instill by persistent instruction','in- ‘in’ + calcare ‘tread’: stamp in']],
 {impostor:['inert','Here in- means ‘not’: in- + ars ‘skill’, so without skill, inactive.']}),
prefix('sub','sub- (suc-, suf-, sup-, sur-, sus-)','under, secretly','Latin','sub ‘under’','submarine, succeed, suffix, suggest, support, suspend',[
 ['subterfuge','deceit used to achieve a goal','subter ‘secretly’ + fugere ‘flee’'],
 ['suborn','bribe someone into wrongdoing','sub- ‘secretly’ + ornare ‘equip’'],
 ['surreptitious','kept secret because it would not be approved','sub- ‘secretly’ + rapere ‘seize’']]),
prefix('dis','dis- (di-, dif-)','apart, away, not','Latin','dis- ‘apart’','distract, divert, differ, dismiss, disagree',[
 ['disparate','essentially different in kind','dis- ‘apart’ + parare ‘prepare’'],
 ['dissemble','conceal one’s true motives or feelings','dis- + simulare ‘pretend’']],
 {impostor:['dismal','From Latin dies mali ‘evil days’, unlucky days on the calendar.']}),
prefix('a','a- / an-','not, without','Greek','a-, an- ‘not’','atypical, anarchy, anonymous, apathy, atheist',[
 ['anodyne','unlikely to provoke offense; bland','an- ‘without’ + odynē ‘pain’: once a painkiller'],
 ['aphasia','loss of ability to understand or express speech','a- ‘without’ + phasis ‘speech’'],
 ['anomie','a lack of social or ethical standards','a- ‘without’ + nomos ‘law’']],
 {impostor:['anoint','From Latin inungere ‘smear on’, via Old French.']}),
prefix('syn','syn- (sym-, syl-)','together, with','Greek','syn ‘with’','synthesis, symphony, syllable, system, synchronize',[
 ['synecdoche','a figure of speech in which a part stands for the whole','syn ‘together’ + ekdechesthai ‘receive’'],
 ['synoptic','giving a general view of the whole','syn ‘together’ + opsis ‘view’']],
 {impostor:['sincere','From Latin sincerus ‘pure, clean’.']}),
prefix('epi','epi- (ep-, eph-)','upon, over, besides','Greek','epi ‘upon’','epidemic, epidermis, episode, epilogue',[
 ['epithet','a descriptive word or phrase; a term of abuse','epi ‘upon’ + tithenai ‘put’'],
 ['ephemeral','lasting a very short time','epi ‘upon’ + hēmera ‘day’']],
 {impostor:['epic','From epos ‘word, song’.']}),
prefix('dia','dia-','through, across','Greek','dia ‘through’','diagonal, diagnosis, dialogue, diameter, dialect',[
 ['diatribe','a bitter verbal attack','dia ‘through’ + tribein ‘rub’: a wearing away of time'],
 ['diaspora','a people dispersed from their homeland','dia ‘across’ + speirein ‘scatter’']],
 {impostor:['diary','From Latin dies ‘day’.'],
  note:'Dialogue is ‘talk through’, not ‘two-talk’.'}),
prefix('para','para-','beside, beyond','Greek','para ‘beside’','parallel, paradox, paraphrase, paragraph, parody',[
 ['paranoia','unfounded suspicion of others','para ‘beyond’ + nous ‘mind’'],
 ['parasite','an organism living at another’s expense','para ‘beside’ + sitos ‘food’: one who eats at another’s table'],
 ['paradigm','a model or pattern of thought that frames a field','para ‘beside’ + deiknynai ‘show’']],
 {impostor:['parasol','From Italian para- ‘shield against’ (Latin parare) + sol ‘sun’.']}),
prefix('meta','meta-','after, beyond, change','Greek','meta ‘after, with’','metaphor, metamorphosis, metabolism, method',[
 ['metastasis','the spread of disease to another part of the body','meta ‘change’ + stasis ‘placement’'],
 ['metonymy','referring to a thing by something closely associated with it','meta ‘change’ + onym ‘name’']],
 {note:'Method is meta + hodos ‘way’: the way after something, pursuit.'}),
prefix('cata','cata- (cat-, cath-)','down, completely','Greek','kata ‘down’','catastrophe, catalog, category, cataract',[
 ['cataclysm','a sudden violent upheaval','kata ‘down’ + klyzein ‘wash’'],
 ['catatonic','in an immobile, unresponsive stupor','kata ‘down’ + tonos ‘tension’']],
 {impostor:['catharsis','From katharos ‘pure’: a cleansing.']}),
prefix('eu','eu-','good, well','Greek','eu ‘well’','euphoria, eulogy, euthanasia, eucalyptus',[
 ['euphemism','a mild word substituted for a harsh one','eu ‘well’ + phēmē ‘speech’'],
 ['eupeptic','having good digestion; cheerful','eu ‘well’ + peptein ‘digest’']],
 {impostor:['eunuch','From eunē ‘bed’ + echein ‘keep’: a bedchamber guard.']})
];

export const roots = [...familiar,...latin,...greek,...prefixes];
const ids = s => s.split(' ');
export const units = [
 {track:'Familiar ground',fast:true,title:'Latin you already use',subtitle:'12 everyday roots, one quick check each',ids:familiar.slice(0,12).map(r=>r.id)},
 {track:'Familiar ground',fast:true,title:'Greek you already use',subtitle:'12 everyday roots, one quick check each',ids:familiar.slice(12).map(r=>r.id)},
 {track:'Latin prefixes',title:'Toward, together, against, out',subtitle:'ad- · con- · ob- · ex-',ids:ids('ad con ob ex')},
 {track:'Latin',title:'Falling, cutting, going, sitting',subtitle:'cad · cis · ced · sed',ids:ids('cad cis ced sed')},
 {track:'Latin',title:'Carrying and sending',subtitle:'fer · mitt · pend · ped',ids:ids('fer mitt pend ped')},
 {track:'Latin prefixes',title:'Not, into, under, apart',subtitle:'in- · in- · sub- · dis-',ids:ids('in-not in-into sub dis')},
 {track:'Latin',title:'Following, speaking, calling, running',subtitle:'sequ · loqu · voc · curr',ids:ids('sequ loqu voc curr')},
 {track:'Latin',title:'Turning, folding, holding, stretching',subtitle:'vert · plic · ten · tend',ids:ids('vert plic ten tend')},
 {track:'Greek prefixes',title:'Without, together, upon, through',subtitle:'a- · syn- · epi- · dia-',ids:ids('a syn epi dia')},
 {track:'Greek',title:'Words and power',subtitle:'log · arch · crat · dem',ids:ids('log arch crat dem')},
 {track:'Greek',title:'The human element',subtitle:'anthrop · morph · phil · soph',ids:ids('anthrop morph phil soph')},
 {track:'Greek prefixes',title:'Beside, beyond, down, well',subtitle:'para- · meta- · cata- · eu-',ids:ids('para meta cata eu')},
 {track:'Greek',title:'Gods, knowledge, appearances',subtitle:'the · gno · dox · phan',ids:ids('the gno dox phan')},
 {track:'Greek',title:'Names, colors, cuts, turns',subtitle:'nym · chrom · tom · trop',ids:ids('nym chrom tom trop')},
 {track:'Latin',title:'Putting, taking, making, begetting',subtitle:'pon · cap · fac · gen',ids:ids('pon cap fac gen')},
 {track:'Latin',title:'Steps, herds, yokes, choices',subtitle:'grad · greg · junct · leg',ids:ids('grad greg junct leg')},
 {track:'Greek',title:'All, same, loosen, eat',subtitle:'pan · homo · lys · phag',ids:ids('pan homo lys phag')},
 {track:'Latin',title:'Death, birth, release, standing',subtitle:'mor · nasc · solv · sta',ids:ids('mor nasc solv sta')},
 {track:'Latin',title:'Victory, faith, light, sting',subtitle:'vinc · fid · luc · pung',ids:ids('vinc fid luc pung')}
];
