// Starter curriculum: word-family connections, not literal modern definitions.
const rows = [
['spect','spect / spec','look, see','Latin','inspect, spectator, spectacle','inspect','look into something closely','In inspect, in- means “into” and spect means “look.” An inspection is a close examination.'],
['port','port','carry','Latin','transport, portable, export','portable','easy to carry','Port means “carry.” Something portable can be carried from place to place.'],
['dict','dict','say, speak','Latin','dictate, predict, verdict','predict','say what will happen beforehand','Pre- means “before”; dict means “say.” To predict is to state what you think will happen.'],
['scrib','scrib / script','write','Latin','describe, manuscript, inscription','manuscript','a handwritten document','Manu- refers to the hand; script means “write.” Manuscripts were originally written by hand.'],
['ject','ject','throw','Latin','eject, inject, project','eject','throw or force out','E- means “out”; ject means “throw.” Ejecting something sends it out.'],
['tract','tract','pull, draw','Latin','attract, tractor, extract','extract','pull something out','Ex- means “out”; tract means “pull.” To extract something is to draw it out.'],
['aud','aud','hear','Latin','audible, audience, audition','audible','able to be heard','Aud means “hear.” The ending -ible indicates possibility: an audible sound can be heard.'],
['vid','vid / vis','see','Latin','visible, vision, video','visible','able to be seen','Vis means “see.” A visible object is one you can see.'],
['rupt','rupt','break','Latin','interrupt, erupt, rupture','interrupt','break into an ongoing action','Inter- means “between”; rupt means “break.” An interruption breaks the continuity of something.'],
['cred','cred','believe, trust','Latin','credible, credit, incredulous','credible','worthy of belief','Cred means “believe.” A credible account is one that can be believed.'],
['bene','bene','well','Latin','benefit, benevolent, benediction','benediction','a blessing or expression of good wishes','Bene means “well”; diction is connected to speaking. A benediction is a blessing.'],
['mal','mal','bad, badly','Latin','malfunction, malice, maltreat','malfunction','fail to work correctly','Mal- means “badly.” A malfunction is a failure to function properly.'],
['bio','bio','life','Greek','biology, biography, biosphere','biography','an account of a person’s life','Bio means “life”; -graphy is connected to writing. A biography tells the story of a life.'],
['graph','graph / gram','write, draw','Greek','autograph, photograph, telegram','autograph','a person’s own signature','Auto- means “self”; graph means “write.” An autograph is written by the person themselves.'],
['phon','phon','sound, voice','Greek','telephone, phonetic, microphone','telephone','a device for transmitting sound over distance','Tele- means “far”; phon means “sound.” A telephone carries voices across a distance.'],
['photo','photo','light','Greek','photograph, photosynthesis, photon','photograph','an image recorded using light','Photo means “light”; graph means “write.” Photography records images using light.'],
['tele','tele','far, distant','Greek','telescope, telephone, television','telescope','an instrument for viewing distant things','Tele means “far”; scope is connected to looking. A telescope helps you see faraway objects.'],
['geo','geo','earth','Greek','geography, geology, geothermal','geothermal','relating to heat within the earth','Geo means “earth”; therm means “heat.” Geothermal energy comes from heat inside the earth.'],
['hydro','hydr / hydro','water','Greek','hydrate, hydroelectric, hydrology','hydroelectric','producing electricity using moving water','Hydro means “water.” Hydroelectric systems use moving water to generate electricity.'],
['therm','therm','heat','Greek','thermal, thermometer, thermos','thermometer','an instrument for measuring temperature','Therm means “heat”; -meter indicates measuring. A thermometer measures temperature.'],
['micro','micro','small','Greek','microscope, microbe, microchip','microscope','an instrument for viewing tiny things','Micro means “small”; scope is connected to looking. A microscope makes tiny things visible.'],
['auto','auto','self','Greek','autobiography, automatic, autonomy','autobiography','a person’s account of their own life','Auto means “self,” bio means “life,” and graph is connected to writing. An autobiography is your own life story.'],
['chron','chron','time','Greek','chronology, chronic, synchronize','chronology','the arrangement of events in time order','Chron means “time.” A chronology puts events in the order in which they happened.'],
['path','path','feeling, suffering','Greek','sympathy, empathy, pathology','sympathy','sharing or understanding another’s feelings','Sym- means “together”; path means “feeling.” Sympathy connects us with another person’s feelings.']
];
export const roots = rows.map(([id,root,meaning,origin,words,word,definition,explanation]) => ({id,root,meaning,origin,words:words.split(', '),word,definition,explanation}));
export const units = [
 {title:'Look. Carry. Speak.',subtitle:'Your first Latin word families',ids:['spect','port','dict']},
 {title:'Words in motion',subtitle:'Writing, throwing, and pulling',ids:['scrib','ject','tract']},
 {title:'Sense & meaning',subtitle:'What we hear, see, and break',ids:['aud','vid','rupt']},
 {title:'A matter of trust',subtitle:'Belief, good, and bad',ids:['cred','bene','mal']},
 {title:'Stories of life',subtitle:'Meet your first Greek roots',ids:['bio','graph','phon']},
 {title:'A wider world',subtitle:'Light, distance, and earth',ids:['photo','tele','geo']},
 {title:'Small wonders',subtitle:'Water, heat, and the microscopic',ids:['hydro','therm','micro']},
 {title:'The human side',subtitle:'Self, time, and feeling',ids:['auto','chron','path']}
];
