import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const outDir = path.join(process.cwd(), "content", "pages");
const poolHero = "url('/images/opt/swimmingpool7-1024.jpg')";
const poolHeroAlt = "url('/images/opt/swimmingpool10-1024.jpg')";
const electricalHero = "url('/images/opt/electrical4-1024.jpg')";
const paintingHero = "url('/images/opt/painting3-1024.jpg')";

const pages = [
  article("seo__pool__leak__repair__cost__singapore__2026.html", {
    eyebrow: "2026 Pool Repair Guide",
    title: "Pool Leak in Singapore: Signs, Solutions & Repair Cost (2026 Guide)",
    intro: "A leaking pool is more than an inconvenience. In Singapore's hot, humid climate, hidden water loss can damage finishes, strain pumps, waste treated water and lead to more expensive structural repairs if it is ignored.",
    image: poolHero,
    cta: "Suspect a pool leak? Contact Luminous Engineering for pool leak inspection, repair advice and a clear quotation before work begins.",
    sections: [
      ["Is It a Leak or Just Evaporation?", ["Outdoor pools in Singapore naturally lose some water through evaporation, splash-out and backwashing. Persistent loss that continues after rain, appears around fittings, or causes damp ground nearby should be checked as a possible leak."]],
      ["7 Warning Signs of a Pool Leak", bullets(["The water level drops faster than normal evaporation.", "You keep topping up the pool every few days.", "Wet patches, soft ground or water stains appear near the pool.", "Tiles, grout or coping stones loosen.", "Air enters the pump line or the pump loses prime.", "Chemical levels become difficult to stabilise.", "Cracks, hollow spots or water seepage are visible around the shell."])],
      ["Common Causes of Pool Leaks", bullets(["Failed pipe joints, valves, unions or underground plumbing.", "Worn pump seals, O-rings and equipment fittings.", "Cracked pool shell, damaged tiles or failed grout.", "Waterproofing membrane failure behind the pool finish.", "Leaking lights, skimmers, returns or drainage points."])],
      ["DIY Bucket Test", ["Fill a bucket with pool water and place it on a pool step. Mark the water level inside the bucket and the pool water level outside the bucket. After 24 hours, compare the drop. If the pool level falls much faster than the bucket level, a leak is likely."]],
      ["Professional Leak Detection & Repair Solutions", ["Professional inspection may include visual checks, dye testing, pressure testing, acoustic tracing and isolation of pipework or equipment sections. Once the source is confirmed, repair may involve resealing fittings, replacing O-rings, repairing pipes, waterproofing damaged areas or renovating failed pool surfaces."]],
      ["Pool Leak Repair Cost in Singapore", table(["Service", "Estimated Cost"], [["Leak detection, dye test or pressure test", "SGD 150-500"], ["Fitting, valve or union reseal", "SGD 150-800"], ["Pump seal or O-ring replacement", "SGD 150-500"], ["Underground pipe repair or rerouting", "SGD 1,000-4,000"], ["Structural shell crack repair", "SGD 300-5,000"], ["Waterproofing membrane replacement", "SGD 3,000-10,000+"], ["Full pool renovation", "SGD 15,000-30,000+"]])],
      ["Why Choose Luminous Engineering?", ["Luminous Engineering handles swimming pool repair, pool equipment work, leak investigation and maintenance across Singapore. We focus on practical diagnosis first, then recommend a repair scope that matches the actual fault instead of guessing."]],
      ["Pool Leak FAQs", faq([["How much does pool leak repair cost in Singapore?", "Minor sealing or equipment repairs may start from a few hundred dollars, while underground pipe, waterproofing or structural repair can cost several thousand dollars depending on access and scope."], ["How do I know if it is a leak or evaporation?", "Use a bucket test over 24 hours. If the pool loses noticeably more water than the bucket, arrange a leak inspection."], ["Can I leave a small pool leak alone?", "It is not recommended. Small leaks can increase water bills, strain equipment and cause hidden damage behind tiles or under decking."], ["How long does pool leak detection take?", "Simple checks may be completed in one visit. Complex underground or structural leaks may need staged testing."], ["Do I need to drain the pool?", "Not always. Many tests and minor repairs can be done without full draining, but some waterproofing or structural repairs require partial or full drainage."]])]
    ]
  }),
  article("seo__pool__water__loss__causes__fixes__cost__singapore__2026.html", {
    eyebrow: "Pool Water Loss",
    title: "Pool Water Loss: Causes, Fixes & Cost Singapore (2026)",
    intro: "If your swimming pool needs frequent topping up, the cause may be normal evaporation, heavy use, equipment backwash or a hidden leak. This guide helps Singapore pool owners narrow down the likely source.",
    image: poolHeroAlt,
    cta: "For recurring pool water loss, Luminous Engineering can inspect the pool, pump system and plumbing before recommending the right fix.",
    sections: [
      ["Normal Water Loss vs a Real Problem", ["Singapore pools can lose water through evaporation and splash-out, but a level that drops quickly every day, keeps falling when the pool is not used, or leaves wet areas nearby should be treated as a possible leak."]],
      ["Common Causes of Pool Water Loss", bullets(["Evaporation during hot, windy periods.", "Splash-out from heavy use.", "Backwashing or drainage valves left open.", "Leaking pump seals, unions or filter equipment.", "Cracked pipes, fittings, tiles or pool structure.", "Failed waterproofing behind the finish."])],
      ["How to Check With the Bucket Test", ["Place a bucket of pool water on a step, mark both water levels and compare after 24 hours. If the pool drops more than the bucket, investigate for leakage."]],
      ["Fixes for Pool Water Loss", bullets(["Adjust operation practices if the cause is evaporation, splash-out or over-backwashing.", "Repair or replace worn pump seals, valves and equipment fittings.", "Pressure-test pipework when underground leakage is suspected.", "Repair tiles, cracks, grout or waterproofing when the pool shell is affected."])],
      ["Pool Water Loss Repair Cost in Singapore", table(["Problem", "Typical Fix", "Estimated Cost"], [["Evaporation or splash-out", "No repair; adjust operation", "No repair cost"], ["Valve or fitting leak", "Reseal or replace fitting", "SGD 150-800"], ["Pump or filter equipment leak", "Seal, O-ring or equipment repair", "SGD 150-1,200"], ["Underground pipe leak", "Pressure test and pipe repair", "SGD 1,000-4,000"], ["Waterproofing failure", "Membrane or surface repair", "SGD 3,000-10,000+"], ["Major structural issue", "Structural repair or renovation", "SGD 5,000-30,000+"]])],
      ["FAQs", faq([["How much pool water loss is normal in Singapore?", "Some water loss is normal, especially outdoors. A sudden or persistent drop is not normal and should be tested."], ["Can a pool lose water without a visible leak?", "Yes. Underground pipes, hidden fittings and waterproofing defects may leak without obvious surface signs."], ["Should I switch off the pump?", "If the pump is running dry, noisy or losing prime, stop it and arrange inspection to avoid equipment damage."]])]
    ]
  }),
  article("seo__pool__cracks__repair__cost__singapore__2026.html", {
    eyebrow: "Pool Crack Repair",
    title: "Pool Cracks: Causes, Repair Options & Cost Singapore (2026)",
    intro: "Pool cracks can be cosmetic, waterproofing-related or structural. The right repair depends on where the crack is, whether it is moving, and whether water is escaping through it.",
    image: poolHero,
    cta: "Need a pool crack assessed? Luminous Engineering can inspect the damage and advise whether sealing, resurfacing or structural repair is required.",
    sections: [
      ["Types of Pool Cracks", bullets(["Hairline surface cracks in plaster, render or tile grout.", "Tile and grout cracks caused by movement or age.", "Structural cracks through the shell.", "Cracks linked to waterproofing failure or water seepage."])],
      ["Common Causes", bullets(["Ground movement or settlement.", "Ageing finishes and worn waterproofing.", "Poor previous repairs.", "Thermal movement, heavy usage or impact damage.", "Water pressure behind the pool surface."])],
      ["Signs a Crack May Be Structural", bullets(["The crack is widening or returning after repair.", "Water level drops faster than normal.", "Tiles pop loose around the crack.", "Rust stains, hollow sounds or damp surrounding areas appear."])],
      ["Repair Methods", bullets(["Epoxy or polyurethane injection for selected cracks.", "Crack chasing, sealing and patch repair.", "Tile replacement and regrouting.", "Waterproofing membrane repair.", "Partial or full resurfacing when damage is widespread."])],
      ["Pool Crack Repair Cost in Singapore", table(["Repair Type", "Estimated Cost"], [["Minor crack sealing", "SGD 300-900"], ["Tile or grout repair around cracks", "SGD 300-1,500"], ["Injection repair", "SGD 800-3,000"], ["Structural crack repair", "SGD 2,000-8,000+"], ["Waterproofing and resurfacing", "SGD 3,000-15,000+"], ["Full pool renovation", "SGD 15,000-30,000+"]])],
      ["FAQs", faq([["Are all pool cracks serious?", "No. Some are cosmetic, but any crack with water loss, movement or loose tiles should be inspected."], ["Can a cracked pool be repaired without renovation?", "Often yes, if the damage is localised. Widespread cracking may require resurfacing or waterproofing."], ["Will crack sealant fix the problem permanently?", "Only if the crack is stable and the cause is addressed. Moving structural cracks need a stronger repair approach."]])]
    ]
  }),
  article("seo__pool__waterproofing__issues__solutions__cost__singapore__2026.html", {
    eyebrow: "Pool Waterproofing",
    title: "Pool Waterproofing Issues: Solutions & Cost Singapore (2026)",
    intro: "Waterproofing is what keeps pool water inside the shell and protects surrounding finishes from seepage. When it fails, symptoms can appear as falling water level, damp patches, hollow tiles or repeated surface damage.",
    image: poolHeroAlt,
    cta: "Luminous Engineering can assess pool waterproofing issues and recommend repair, resurfacing or renovation based on the affected area.",
    sections: [
      ["What Pool Waterproofing Does", ["A pool waterproofing system sits behind or within the finished surface. It helps resist water pressure, protects the structure and reduces seepage into surrounding decks, rooms or soil."]],
      ["Signs Waterproofing Has Failed", bullets(["Persistent water loss.", "Damp walls, wet ground or water stains around the pool.", "Loose tiles, hollow render or bubbling finishes.", "Recurring cracks after patch repairs.", "Efflorescence or mineral staining."])],
      ["Why Waterproofing Fails", bullets(["Ageing membrane or surface finish.", "Poor substrate preparation.", "Movement in the pool shell.", "Incorrect product selection.", "Previous repairs that treated symptoms but not the waterproofing layer."])],
      ["Repair Solutions", bullets(["Localised sealing for small fitting or joint defects.", "Tile removal, substrate repair and membrane reinstatement.", "Crack repair before waterproofing work.", "Partial resurfacing for damaged zones.", "Full renovation where the membrane has failed widely."])],
      ["Pool Waterproofing Cost in Singapore", table(["Scope", "Estimated Cost"], [["Minor sealing or local repair", "SGD 300-1,500"], ["Tile removal and local waterproofing", "SGD 1,500-5,000"], ["Partial pool waterproofing", "SGD 3,000-10,000"], ["Full pool waterproofing and resurfacing", "SGD 10,000-25,000+"], ["Full pool renovation", "SGD 15,000-30,000+"]])],
      ["FAQs", faq([["Can pool waterproofing be patched?", "Small local defects can sometimes be patched, but recurring or widespread leakage usually needs a broader repair."], ["Do tiles make a pool waterproof?", "No. Tiles are a finish. The waterproofing layer beneath them is what controls seepage."], ["How long does waterproofing work take?", "Small repairs may be quick; full resurfacing and waterproofing can take days to weeks depending on curing time and scope."]])]
    ]
  }),
  article("seo__cloudy__pool__water__causes__fixes__cost__singapore__2026.html", {
    eyebrow: "Pool Water Clarity",
    title: "Cloudy Pool Water: Causes, Fixes & Cost Singapore (2026)",
    intro: "Cloudy pool water is common in Singapore because heat, rain and high usage can quickly disturb water balance. The cause may be chemical, filtration-related or linked to equipment faults.",
    image: poolHero,
    cta: "If cloudy water keeps returning, Luminous Engineering can check water balance, filtration, circulation and equipment condition.",
    sections: [
      ["Common Causes of Cloudy Pool Water", bullets(["Poor filtration or short filtration time.", "Dirty filter media or blocked cartridges.", "Incorrect pH, alkalinity or chlorine level.", "Algae growth after rain or heavy usage.", "Weak circulation from pump or valve problems.", "Fine debris or suspended particles."])],
      ["Why It Is Common in Singapore", ["Warm weather, humidity, heavy rainfall and frequent pool usage can dilute chemicals and encourage algae. Pools here often need consistent maintenance rather than occasional cleaning."]],
      ["Fixes for Cloudy Pool Water", bullets(["Test and correct pH, chlorine and alkalinity.", "Brush the pool and remove debris.", "Clean or backwash filters.", "Run filtration long enough for recovery.", "Inspect pump performance and circulation.", "Use clarifier or flocculant when appropriate."])],
      ["When to Call a Professional", ["Call for help if the water turns cloudy again after treatment, the pump or filter is weak, algae returns quickly, or the pool has not been maintained regularly."]],
      ["Cloudy Pool Water Service Cost in Singapore", table(["Service", "Estimated Cost"], [["Water test and chemical balancing", "SGD 80-200"], ["One-time cleaning and recovery", "SGD 150-500"], ["Filter cleaning", "SGD 120-400"], ["Pump or circulation troubleshooting", "SGD 150-600"], ["Green pool or heavy algae recovery", "SGD 300-1,200+"], ["Ongoing pool maintenance", "From about SGD 200/month depending on size and frequency"]])],
      ["FAQs", faq([["Is cloudy pool water safe to swim in?", "It is best to avoid swimming until the water is clear and properly balanced."], ["Will chlorine fix cloudy water?", "Sometimes, but not if the underlying issue is filtration, pH, circulation or dirty filter media."], ["How fast can cloudy water clear?", "Mild cloudiness may improve within a day. Severe algae or filter problems may take longer."]])]
    ]
  }),
  article("seo__pool__tile__damage__repair__cost__singapore__2026.html", {
    eyebrow: "Pool Tile Repair",
    title: "Pool Tile Damage: Repair Options & Cost in Singapore (2026 Guide)",
    intro: "Loose, cracked or missing pool tiles are not just cosmetic. Tile damage can expose waterproofing layers, create sharp edges and allow water to reach areas that should stay protected.",
    image: poolHeroAlt,
    cta: "Luminous Engineering provides pool tile inspection, regrouting, local replacement and broader repair advice for Singapore pools.",
    sections: [
      ["Common Causes of Pool Tile Damage", bullets(["Ageing grout and adhesive.", "Waterproofing failure behind tiles.", "Movement or settlement in the pool shell.", "Poor previous installation or incompatible materials.", "Impact damage, chemical imbalance or long-term wear."])],
      ["Signs You Need Tile Repair", bullets(["Loose, hollow or missing tiles.", "Cracked tile lines or broken edges.", "Grout falling out between tiles.", "Water seepage behind tiled areas.", "Repeated staining or rough surfaces."])],
      ["Repair Options", bullets(["Regrouting for worn joints.", "Local tile replacement for isolated damage.", "Section retiling with substrate and waterproofing repair.", "Full retiling when damage is widespread or the surface is ageing."])],
      ["Pool Tile Repair Cost in Singapore", table(["Repair Type", "Estimated Cost"], [["Regrouting small areas", "SGD 300-1,200"], ["Local tile replacement", "SGD 300-1,500"], ["Section retiling and waterproofing repair", "SGD 1,500-6,000"], ["Full pool retiling", "SGD 10,000-25,000+"], ["Full renovation with surface repairs", "SGD 15,000-30,000+"]])],
      ["DIY vs Professional Repair", ["Small cosmetic grout touch-ups may be manageable for some owners, but underwater tile repairs need the right adhesive, surface preparation and waterproofing checks. Poor repairs often fail quickly in pool conditions."]],
      ["FAQs", faq([["Can loose pool tiles be repaired without draining the pool?", "Some local repairs may be possible with partial lowering, but many tile and waterproofing repairs require controlled draining."], ["Should I ignore one missing tile?", "No. Missing tiles can expose the backing layer and create a sharp or unsafe edge."], ["Can you match existing pool tiles?", "Matching depends on tile availability. If an exact match is unavailable, a practical close match or section retiling may be recommended."]])]
    ]
  }),
  article("seo__pool__pump__problems__repair__cost__singapore__2026.html", {
    eyebrow: "Pool Pump Guide",
    title: "Pool Pump Problems: Solutions & Repair Cost in Singapore (2026 Guide)",
    intro: "The pool pump keeps water moving through the filtration system. When it becomes noisy, loses suction or stops working, water quality can decline quickly.",
    image: poolHero,
    cta: "For pool pump faults, Luminous Engineering can troubleshoot the pump, valves, filter and pipework before recommending repair or replacement.",
    sections: [
      ["Common Pool Pump Problems", bullets(["Pump will not start.", "Pump hums but does not run.", "Low suction or weak return flow.", "Air bubbles in the pump basket.", "Pump loses prime.", "Leaks around seals or fittings.", "Loud grinding, screeching or vibration.", "Pump trips the electrical supply."])],
      ["DIY Checks Before Calling", bullets(["Check that power is available and breakers are not tripped.", "Confirm valves are open.", "Clean the pump basket and skimmer basket.", "Look for visible leaks or cracked lids.", "Do not keep running a pump that is dry, noisy or overheating."])],
      ["Repair Solutions", bullets(["Seal, O-ring and lid replacement.", "Impeller cleaning or repair.", "Bearing, capacitor or motor troubleshooting.", "Valve and pipe fitting repair.", "Pump replacement when repair is uneconomical."])],
      ["Pool Pump Repair Cost in Singapore", table(["Service", "Estimated Cost"], [["Troubleshooting visit", "SGD 100-250"], ["Seal, O-ring or small part replacement", "SGD 150-500"], ["Impeller or minor mechanical repair", "SGD 250-800"], ["Motor or electrical repair", "SGD 300-1,200"], ["Pump replacement", "SGD 800-2,500+"], ["Pipework or valve repair linked to pump", "SGD 300-1,500+"]])],
      ["Repair or Replace?", ["Repair may make sense when the pump is relatively new and the fault is isolated. Replacement is often better when the pump is old, inefficient, repeatedly leaking or when parts are difficult to source."]],
      ["FAQs", faq([["Why is my pool pump noisy?", "Noise may come from worn bearings, trapped air, vibration, cavitation or debris in the impeller."], ["Can a pool pump run without water?", "No. Running dry can damage seals and overheat the pump."], ["How quickly should a faulty pump be repaired?", "Promptly. Poor circulation can lead to cloudy or green water and further equipment strain."]])]
    ]
  }),
  article("seo__pool__renovation__cost__singapore__2026.html", {
    eyebrow: "Pool Renovation",
    title: "Pool Renovation: Problems, Solutions & Cost in Singapore (2026 Guide)",
    intro: "A pool renovation may be needed when repeated patch repairs no longer solve leaks, surface damage, tile failure or equipment problems. Renovation can restore safety, appearance and long-term reliability.",
    image: poolHeroAlt,
    cta: "Planning a pool renovation? Luminous Engineering can inspect the existing pool and scope practical renovation options for your property.",
    sections: [
      ["Signs Your Pool Needs Renovation", bullets(["Frequent leaks or water loss.", "Widespread cracked tiles, grout or surface damage.", "Ageing waterproofing or recurring seepage.", "Outdated equipment that keeps failing.", "Rough, stained or unsafe pool surfaces.", "Design, lighting or usability issues."])],
      ["Common Pool Renovation Problems", bullets(["Hidden waterproofing damage behind finishes.", "Deteriorated pipework or fittings.", "Uneven surfaces and hollow tiles.", "Old pumps, filters or lights needing replacement.", "Access limits in landed, condo or commercial settings."])],
      ["Renovation Solutions", bullets(["Tile replacement or full retiling.", "Resurfacing and waterproofing.", "Pipework and fitting upgrades.", "Pump, filter, lighting and equipment replacement.", "Safety, access and finish upgrades."])],
      ["Pool Renovation Cost in Singapore", table(["Scope", "Estimated Cost"], [["Minor surface refresh", "SGD 3,000-8,000"], ["Partial tile and waterproofing repair", "SGD 5,000-15,000"], ["Equipment upgrade package", "SGD 2,000-10,000+"], ["Full resurfacing or retiling", "SGD 10,000-25,000+"], ["Full pool renovation", "SGD 15,000-30,000+"]])],
      ["Typical Timeline", ["Small repairs may take a few days. Larger renovation work can take several weeks depending on drainage, hacking, waterproofing, curing time, tile work, equipment installation and testing."]],
      ["FAQs", faq([["Can I renovate only part of the pool?", "Yes, if the problem is localised. Widespread surface or waterproofing failure may require a broader scope."], ["Do I need new equipment during renovation?", "Not always, but renovation is a good time to assess pump, filter, lights and controls."], ["Will the pool be unusable during renovation?", "Yes. Most renovation work requires the pool to be out of service until testing and commissioning are complete."]])]
    ]
  }),
  article("seo__pool__surface__damage__repair__cost__singapore__2026.html", {
    eyebrow: "Pool Surface Repair",
    title: "Pool Surface Damage: Repair Solutions & Cost in Singapore (2026 Guide)",
    intro: "Pool surface damage can affect comfort, appearance and waterproofing. Rough spots, stains, hollow tiles and cracks should be checked before they turn into larger repair work.",
    image: poolHero,
    cta: "Luminous Engineering can inspect pool surface damage and advise whether local repair, resurfacing or renovation is the best option.",
    sections: [
      ["Types of Pool Surface Damage", bullets(["Cracked plaster, render or tiles.", "Loose, hollow or missing tiles.", "Rough or sharp surfaces.", "Staining and scaling.", "Bubbling, delamination or peeling coatings.", "Grout erosion and water seepage."])],
      ["Common Causes", bullets(["Age, chemical imbalance and weather exposure.", "Poor previous repairs.", "Movement in the shell or substrate.", "Failed waterproofing or adhesive.", "Heavy usage and impact damage."])],
      ["Repair Solutions", bullets(["Local patching and crack repair.", "Tile replacement and regrouting.", "Acid washing or stain treatment where suitable.", "Waterproofing and resurfacing.", "Full pool renovation for widespread deterioration."])],
      ["Pool Surface Repair Cost in Singapore", table(["Repair Type", "Estimated Cost"], [["Small patch or local repair", "SGD 300-1,200"], ["Tile and grout repair", "SGD 300-1,500"], ["Stain or scale treatment", "SGD 200-800"], ["Partial resurfacing", "SGD 3,000-10,000"], ["Full resurfacing or retiling", "SGD 10,000-25,000+"], ["Full renovation", "SGD 15,000-30,000+"]])],
      ["Prevention Tips", bullets(["Keep water chemistry balanced.", "Clean and maintain filters regularly.", "Repair small cracks or missing grout early.", "Avoid harsh DIY chemicals that can damage finishes.", "Schedule inspections when surface issues keep returning."])],
      ["FAQs", faq([["Can rough pool surfaces be repaired?", "Yes. Local rough areas may be patched or polished, while widespread roughness may need resurfacing."], ["Are stains always permanent?", "No. Some stains can be treated, but deep staining linked to surface failure may need resurfacing."], ["Does surface damage cause leaks?", "It can, especially when cracks or loose tiles expose waterproofing layers."]])]
    ]
  }),
  article("seo__pool__water__level__dropping__causes__fixes__cost__singapore__2026.html", {
    eyebrow: "Pool Leak Troubleshooting",
    title: "Pool Water Level Dropping: Causes, Fixes & Cost in Singapore (2026 Guide)",
    intro: "A pool water level that keeps dropping can point to evaporation, usage patterns, equipment discharge or a leak. The key is to test before replacing parts or starting major repairs.",
    image: poolHeroAlt,
    cta: "If your pool water level keeps dropping, Luminous Engineering can inspect the pool shell, fittings, plumbing and equipment system.",
    sections: [
      ["Start With the Bucket Test", ["The bucket test compares pool water loss with normal evaporation. Mark the water level inside a bucket and outside at the pool level, then compare after 24 hours. A faster drop in the pool suggests leakage."]],
      ["Common Causes", bullets(["Normal evaporation, especially outdoors.", "Splash-out and overflow after heavy use or rain.", "Backwash valve or drain line issues.", "Leaking pump, filter, heater or chlorinator fittings.", "Underground pipe leaks.", "Cracked tiles, shell or waterproofing membrane."])],
      ["How Professionals Narrow Down the Leak", bullets(["Visual inspection of shell, fittings and plant room.", "Pump and filter equipment checks.", "Dye testing around suspected fittings or cracks.", "Pressure testing pipe lines.", "Acoustic or staged testing for hidden leaks."])],
      ["Fixes and Costs", table(["Cause", "Possible Fix", "Estimated Cost"], [["Evaporation or usage", "Operational adjustment", "No repair cost"], ["Equipment fitting leak", "Reseal or replace fittings", "SGD 150-800"], ["Pump or filter leak", "Seal, O-ring or equipment repair", "SGD 150-1,200"], ["Pipe leak", "Pressure test and repair", "SGD 1,000-4,000"], ["Tile, crack or waterproofing leak", "Surface or membrane repair", "SGD 300-10,000+"], ["Major structural issue", "Renovation or structural repair", "SGD 5,000-30,000+"]])],
      ["Why You Should Not Ignore It", ["Ongoing water loss wastes treated water, upsets chemical balance, can damage pumps and may create hidden structural or waterproofing damage around the pool."]],
      ["FAQs", faq([["Why does my pool lose water overnight?", "A drop overnight can be a leak, especially when there is no sun-driven evaporation. Use a bucket test and inspect equipment areas."], ["Can a leaking pool damage my property?", "Yes. Hidden water can affect decks, soil, nearby rooms and electrical or mechanical equipment."], ["What should I send before a site visit?", "Photos or videos of the pool, plant room, water level changes, wet patches and equipment noises help with triage."]])]
    ]
  }),
  article("seo__pool__leakage__detection__methods__repair__cost__singapore.html", {
    eyebrow: "Leak Detection Methods",
    title: "Pool Leakage: Detection Methods & Repair Cost in Singapore (2026 Guide)",
    intro: "Professional pool leakage detection helps locate the source before repair work begins. In Singapore, common methods include visual inspection, pressure testing, dye testing, acoustic tracing and bucket testing.",
    image: poolHero,
    cta: "Suspect a pool leak? Contact Luminous Engineering for leakage detection, repair options and a transparent scope before work starts.",
    sections: [
      ["Signs You May Have Pool Leakage", bullets(["Water level keeps falling after normal topping up.", "The pump loses prime or draws air.", "Wet ground, damp walls or stains appear near the pool.", "Tiles, grout or coping stones loosen.", "Chemical readings become unstable.", "Cracks, hollow surfaces or seepage marks are visible."])],
      ["Professional Pool Leakage Detection Methods", bullets(["Visual inspection of the pool shell, fittings, tiles, grout and plant room.", "Pressure testing to isolate leaking pipe runs.", "Dye testing around cracks, fittings and suspected seepage points.", "Acoustic tracing for hidden underground leaks.", "Bucket testing to compare water loss against evaporation."])],
      ["Common Leakage Sources", bullets(["Pump seals, unions and valves.", "Skimmers, returns, lights and fittings.", "Underground pipes.", "Cracked shell or damaged tile areas.", "Failed waterproofing membrane."])],
      ["Pool Leakage Detection and Repair Cost", table(["Service", "Estimated Cost"], [["Basic leakage inspection", "SGD 150-500"], ["Pressure or dye testing", "SGD 150-700"], ["Equipment fitting repair", "SGD 150-800"], ["Pump seal or O-ring repair", "SGD 150-500"], ["Underground pipe repair", "SGD 1,000-4,000"], ["Waterproofing repair", "SGD 3,000-10,000+"], ["Full renovation", "SGD 15,000-30,000+"]])],
      ["Typical Timeline", ["Simple equipment leaks may be diagnosed and repaired quickly. Hidden pipe, waterproofing or structural leakage may require staged testing, draining, hacking, curing and follow-up water testing."]],
      ["FAQs", faq([["What is the best pool leak detection method?", "There is no single best method. The right approach depends on symptoms, pool design and whether the suspected source is equipment, pipework or the pool shell."], ["Can you detect pool leakage without draining the pool?", "Often yes. Visual, dye and pressure tests may be possible without full drainage."], ["How much does pool leakage repair cost in Singapore?", "Minor repairs may cost a few hundred dollars. Underground pipework, waterproofing or structural work can cost several thousand dollars."]])]
    ]
  }),
  article("seo__best__swimming__pool__contractor__singapore.html", {
    eyebrow: "Singapore Contractor Guide",
    title: "Best Swimming Pool Contractor Singapore [2026]",
    intro: "Choosing a swimming pool contractor in Singapore is about more than price. You need a team that understands pool construction, repair, waterproofing, equipment, maintenance and after-service support.",
    image: poolHero,
    cta: "For pool construction, renovation, repair or maintenance, speak with Luminous Engineering for a clear assessment and quotation.",
    sections: [
      ["Top Swimming Pool Contractors in Singapore", numbered(["Luminous Engineering - swimming pool repair, maintenance, equipment installation, renovation support and practical pool project advice.", "Hydro Pools - pool construction and specialist pool systems.", "Water Concepts & Consultancy - design-led pool and water feature work.", "Pool World - pool maintenance and equipment services.", "Pacific Pools - construction and maintenance for private pools.", "Aqua Works - pool care and water treatment support.", "Desjoyaux Pools Singapore - modular pool systems.", "Crystal Pools - pool cleaning and repair services.", "Singapore Swimming Pool Services - residential and commercial pool support.", "Specialist niche contractors - useful for highly specific equipment, tiling or waterproofing scopes."])],
      ["Why Luminous Engineering Is a Strong Choice", bullets(["Swimming pool repair, maintenance and equipment work under one roof.", "Support for pump, filter, leak, tile, waterproofing and renovation issues.", "Residential, condominium, MCST-managed and commercial pool experience.", "Practical diagnosis before recommending major work.", "Island-wide support across Singapore."])],
      ["Swimming Pool Contractor Cost Guide", table(["Service", "Estimated Cost"], [["Pool inspection or troubleshooting", "SGD 100-500"], ["Pool maintenance", "From about SGD 200/month"], ["Equipment repair", "SGD 150-1,500+"], ["Leak detection and repair", "SGD 150-10,000+"], ["Pool renovation", "SGD 15,000-30,000+"], ["New pool construction", "Quoted after site assessment"]])],
      ["How to Choose a Pool Contractor", bullets(["Ask for a written scope and quotation.", "Check whether diagnosis is included before major repair.", "Confirm warranty terms and exclusions in writing.", "Review experience with the specific pool problem you have.", "Avoid choosing on the lowest price alone when waterproofing or structural work is involved."])],
      ["FAQs", faq([["Who is the best swimming pool contractor in Singapore?", "The best contractor depends on your scope. Luminous Engineering is a strong choice for pool repair, maintenance, equipment work and practical renovation support."], ["How much does pool repair cost?", "Minor repairs may cost a few hundred dollars. Leak, waterproofing or renovation work can cost several thousand dollars."], ["Do pool contractors handle maintenance too?", "Some do. Luminous Engineering supports both pool repair and pool maintenance services."]])]
    ]
  }),
  article("seo__best__electrician__singapore.html", {
    eyebrow: "Singapore Electrician Guide",
    title: "Best Electrician Singapore [2026]",
    intro: "Electrical problems should be handled by a reliable professional who can diagnose safely, explain the issue clearly and provide practical repair options.",
    image: electricalHero,
    cta: "Need electrical troubleshooting, power trip repair, wiring, socket or lighting work? Contact Luminous Engineering for help across Singapore.",
    sections: [
      ["Top Electrician Services in Singapore", numbered(["Luminous Engineering - electrical troubleshooting, power trip repair, wiring, DB box, socket, switch and lighting work.", "Daylight Electrician Singapore - residential electrical support.", "Everyworks Singapore - home services and electrical jobs.", "LS Electrician Services - general electrical repairs.", "Electrician Singapore - emergency and routine electrical services.", "Handyman Singapore providers - useful for smaller household electrical tasks.", "Commercial electrical contractors - suitable for business and fit-out projects.", "Specialist lighting installers - good for lighting-focused upgrades.", "Appliance electrical support teams - useful for appliance-related faults.", "Building management appointed electricians - often required for condo or commercial premises."])],
      ["Common Electrical Services", bullets(["Power trip troubleshooting.", "Socket and switch installation.", "Light installation and replacement.", "Electrical wiring and rewiring.", "DB box inspection and upgrades.", "Emergency electrical fault support."])],
      ["Electrician Price Guide", table(["Service", "Estimated Cost"], [["Troubleshooting visit", "SGD 80-200"], ["Socket or switch replacement", "SGD 80-250"], ["New power point installation", "SGD 150-450+"], ["Light installation", "SGD 80-350+"], ["Power trip repair", "SGD 100-400+"], ["DB box or wiring work", "Quoted after inspection"]])],
      ["How to Choose an Electrician", bullets(["Explain the symptoms clearly before booking.", "Ask for a written estimate when the scope is known.", "Confirm whether parts are included.", "Choose a provider experienced with your fault type.", "Do not keep resetting a breaker if it trips repeatedly."])],
      ["FAQs", faq([["What should I do during a power trip?", "Switch off affected appliances, avoid repeated resetting and call an electrician if the trip repeats."], ["Can an electrician install extra sockets?", "Yes, subject to safe routing, load and site conditions."], ["How much does an electrician cost in Singapore?", "Small jobs may start under a few hundred dollars, while rewiring or DB work requires inspection and quotation."]])]
    ]
  }),
  article("seo__best__painting__companies__singapore.html", {
    eyebrow: "Singapore Painting Guide",
    title: "Best Painting Companies in Singapore [2026]",
    intro: "A good painting contractor helps with surface preparation, paint selection, scheduling and clean workmanship. This guide compares common provider types and what to check before hiring.",
    image: paintingHero,
    cta: "For HDB, condo, landed or commercial painting enquiries, contact Luminous Engineering for a practical quote and scope.",
    sections: [
      ["Best Painting Companies in Singapore", numbered(["Luminous Engineering - residential and commercial painting with broader renovation support.", "Nippon Paint service providers - branded paint and applicator options.", "Reliable Painting SG - home painting support.", "A&J Painting Services - residential painting.", "Painting services by renovation contractors - suitable when painting is part of a larger project.", "HDB painting specialists - efficient repainting for flats.", "Condo painting contractors - useful where management rules apply.", "Landed property painters - exterior and large-area experience.", "Commercial painters - office and retail projects.", "Specialist coating contractors - textured, waterproof or industrial finishes."])],
      ["Common Painting Services", bullets(["HDB and condo interior painting.", "Landed property painting.", "Office and commercial painting.", "Ceiling, wall and door painting.", "Surface patching and preparation.", "Touch-up and repainting after renovation."])],
      ["Painting Cost Guide", table(["Scope", "Estimated Cost"], [["Room touch-up", "SGD 150-500"], ["HDB flat painting", "SGD 600-1,800+"], ["Condo painting", "SGD 800-2,500+"], ["Landed property interior", "SGD 2,000-6,000+"], ["Exterior painting", "Quoted after site assessment"], ["Commercial painting", "Quoted by area and schedule"]])],
      ["How to Choose a Painting Contractor", bullets(["Check what surface preparation is included.", "Confirm paint brand, number of coats and colours.", "Ask about furniture protection and cleanup.", "Clarify timeline and access requirements.", "Request a written quotation before work starts."])],
      ["FAQs", faq([["How long does home painting take?", "A small flat may take one to several days depending on preparation, coats and drying time."], ["Is cheap painting worth it?", "Low quotes may exclude preparation, protection or enough coats. Compare scope, not just price."], ["Can painting be done while occupied?", "Often yes, with room-by-room planning and furniture protection."]])]
    ]
  }),
  service("seo__services__swimming__pool__repair.html", {
    eyebrow: "Pool Repair Singapore",
    title: "Swimming Pool Repair & Equipment Installation in Singapore",
    intro: "Luminous Engineering provides swimming pool repair and equipment installation services for residential, condominium, MCST-managed and commercial pools across Singapore.",
    image: poolHero,
    cta: "For pump faults, leaks, filter issues, cloudy water or damaged equipment, send us photos or videos and we will advise the next step.",
    sections: [
      ["Swimming Pool Repair Services We Provide", bullets(["Pool pump repair and installation.", "Pool filter repair and installation.", "Pool leak detection and repair.", "Pool pipe and plumbing repair.", "Pool heater troubleshooting.", "Chlorinator and saltwater system support.", "Pool lighting and equipment replacement.", "Other pool equipment inspection and installation."])],
      ["Common Pool Problems We Handle", bullets(["Pump not working or losing prime.", "Pool losing water.", "Poor circulation or weak return flow.", "Filter not cleaning properly.", "Pump noise, vibration or overheating.", "Equipment shuts down or trips.", "Cloudy, green or unsafe water.", "Pipes, valves or fittings leaking.", "Heater not heating.", "Chlorinator not producing chlorine."])],
      ["Our Repair Process", numbered(["Triage the issue by phone or WhatsApp.", "Review photos, videos and symptoms.", "Inspect the pool, plant room and equipment.", "Identify likely fault sources.", "Explain repair or replacement options.", "Confirm scope and quotation.", "Carry out repair or installation work.", "Test the system and advise maintenance steps."])],
      ["Repair vs Replace", ["We recommend repair when the fault is isolated and parts are practical. Replacement may be better for old, inefficient, repeatedly failing or unsafe equipment."]],
      ["Swimming Pool Repair Cost", table(["Service", "Estimated Cost"], [["Troubleshooting or inspection", "SGD 100-500"], ["Minor seal, fitting or part repair", "SGD 150-800"], ["Pump or filter repair", "SGD 250-1,500+"], ["Equipment replacement", "Quoted by model and scope"], ["Leak or pipe repair", "SGD 150-4,000+"], ["Waterproofing or renovation-related repair", "Quoted after inspection"]])],
      ["Why Choose Luminous Engineering?", bullets(["Practical pool repair and equipment experience.", "Support for both urgent faults and planned upgrades.", "Residential and commercial pool support.", "Clear recommendations before major work.", "Workmanship warranty terms confirmed in the quote or contract."])],
      ["FAQs", faq([["Do you repair pool pumps?", "Yes. We inspect pump faults, seals, fittings, suction issues and replacement options."], ["Do you install new pool equipment?", "Yes. We can help with pump, filter, lighting and related equipment installation depending on site requirements."], ["Do you provide emergency pool repair?", "Yes. Urgent pool fault enquiries can be sent by phone or WhatsApp for triage."]])]
    ]
  }),
  service("seo__services__swimming__pool__maintenance.html", {
    eyebrow: "Pool Maintenance Singapore",
    title: "Professional Pool Maintenance Services in Singapore",
    intro: "Luminous Engineering provides routine pool maintenance, cleaning, water testing and equipment checks for private residential, condominium, MCST-managed and commercial swimming pools.",
    image: poolHeroAlt,
    cta: "Keep your pool clear, balanced and ready to use with a maintenance schedule matched to your pool size and usage.",
    sections: [
      ["Comprehensive Pool Maintenance Services", bullets(["Routine pool cleaning.", "Water testing and chemical balancing.", "Algae, green pool and cloudy water treatment.", "Filter cleaning and backwashing.", "Pump and circulation checks.", "Equipment inspection.", "Leak and water level checks.", "Pool surface and tile condition checks."])],
      ["What Is Included in Professional Pool Maintenance?", table(["Task", "Included Work"], [["Water testing", "pH, chlorine and basic balance checks"], ["Cleaning", "Skimming, brushing and vacuuming as required"], ["Filter care", "Backwash, cartridge cleaning or filter inspection"], ["Equipment checks", "Pump, valves, visible leaks and circulation"], ["Water condition", "Cloudiness, algae and chemical adjustment advice"]])],
      ["How Often Should a Swimming Pool Be Maintained?", ["Many Singapore pools benefit from weekly or twice-monthly maintenance because heat and rain can change water balance quickly. Lower-use pools may use monthly servicing if the water remains stable."]],
      ["Pool Maintenance Plans in Singapore", table(["Plan", "Pool Size", "Estimated Monthly Price"], [["Monthly", "Up to 50 sqm", "SGD 200"], ["Twice monthly", "Up to 50 sqm", "SGD 380"], ["Weekly", "Up to 50 sqm", "SGD 700"], ["Monthly", "51-100 sqm", "SGD 300"], ["Twice monthly", "51-100 sqm", "SGD 570"], ["Weekly", "51-100 sqm", "SGD 1,050"]])],
      ["What Affects Pool Maintenance Cost?", bullets(["Pool size and shape.", "Indoor or outdoor exposure.", "Usage level.", "Equipment condition.", "Algae or recovery work needed.", "Access, parking and management requirements.", "Service frequency."])],
      ["Maintenance vs Repair", table(["Maintenance", "Repair"], [["Prevents cloudy water and algae", "Fixes leaks, equipment faults or damage"], ["Routine scheduled work", "Usually arranged when a fault appears"], ["Water testing and cleaning", "Diagnosis, parts and corrective work"], ["Helps extend equipment life", "Restores failed systems or surfaces"]])],
      ["FAQs", faq([["How much does pool maintenance cost in Singapore?", "Plans vary by pool size and frequency. Smaller pools may start from about SGD 200 monthly, with higher prices for larger or more frequent servicing."], ["Do you maintain condo or MCST pools?", "Yes. We support landed homes, condominiums, MCST-managed/common facilities and commercial pools subject to access requirements."], ["Can maintenance fix cloudy water?", "Often yes, but recurring cloudiness may require equipment or filtration troubleshooting."]])]
    ]
  }),
  service("seo__services__emergency__swimming__pool__services.html", {
    eyebrow: "Rapid Pool Support Across Singapore",
    title: "Emergency Swimming Pool Services Singapore",
    intro: "Singapore's 24/7 emergency swimming pool service for urgent pool faults, water loss, pump failure, filter problems and unsafe water conditions. We aim to respond to urgent calls the same day when scheduling allows.",
    image: poolHero,
    cta: "For urgent pool faults, call or WhatsApp Luminous Engineering with photos, videos and your location so we can triage the issue quickly.",
    sections: [
      ["Pool Problems That Should Not Wait", bullets(["Sudden water loss or suspected major leak.", "Pump failure, overheating or loss of circulation.", "Filter or equipment fault causing unsafe water.", "Green, cloudy or contaminated water before pool use.", "Electrical trip or equipment shutdown around the pool system."])],
      ["What to Do Now", bullets(["Stay safe and keep users away from unsafe water or exposed equipment.", "Send clear photos or videos of the pool, plant room and fault.", "Avoid repeated breaker resets or running a dry pump.", "Do not guess with chemicals if the water condition is severe."])],
      ["Emergency Response Workflow", numbered(["Receive your call or WhatsApp enquiry.", "Triage the urgency and visible symptoms.", "Advise immediate safety steps.", "Confirm attendance estimate and response quote when possible.", "Inspect, isolate the fault and recommend recovery steps.", "Carry out agreed repair, recovery or follow-up work."])],
      ["Priority Levels", table(["Priority", "Typical Situation"], [["Immediate safety", "Electrical risk, unsafe equipment or serious hazard"], ["Urgent", "Major water loss, pump failure or unusable pool"], ["Same-day advice", "Photos, videos and triage before attendance"], ["Priority booking", "Fault needs repair but is stable enough to schedule"]])],
      ["Safety Checklist", bullets(["Keep swimmers out of cloudy, green or chemically unsafe water.", "Switch off equipment if it is running dry, smoking, tripping or overheating.", "Keep children away from plant rooms and exposed fittings.", "Document the water level and visible leaks before they change."])],
      ["Pool Fault and Recovery Work", ["Emergency pool recovery may involve leak checks, pump or filter troubleshooting, equipment isolation, cleaning, chemical balancing and follow-up repair planning."]],
      ["Emergency Pool Service Packages", bullets(["Leak triage and water loss checks.", "Pump fault troubleshooting.", "Filter and circulation recovery.", "Green or cloudy water recovery.", "Equipment isolation and safety checks.", "Follow-up repair and maintenance planning."])],
      ["FAQs", faq([["What is your response time for a pool emergency in Singapore?", "Emergency enquiries are accepted 24/7 by phone and WhatsApp. Response and attendance time depend on triage findings, your location within Singapore, and technician availability, and we will give you a clear time estimate as soon as we have assessed the issue."], ["How much does emergency pool repair cost in Singapore?", "Emergency pool repair pricing depends on call-out time and access, the diagnostic work required, any replacement parts needed, and follow-up cleaning or water treatment. We confirm the response quote after triage so you know the scope before work begins."], ["Can you help if my pool pump has stopped suddenly?", "Yes. Send photos or video of the pump, filter and control area so we can triage the fault."], ["Should I keep using the pool if the water is cloudy or green?", "No. Keep the pool closed until the water is tested, treated and clear."]])]
    ]
  })
];

await mkdir(outDir, { recursive: true });
for (const page of pages) {
  await writeFile(path.join(outDir, page.file), page.html, "utf8");
}

console.log(`Generated ${pages.length} SEO content pages.`);

function article(file, data) {
  return page(file, data);
}

function service(file, data) {
  return page(file, data);
}

function page(file, data) {
  const html = `<main class="seo-content-page">
  <section class="seo-hero" style="--seo-hero-image: ${data.image}">
    <div class="seo-hero__inner">
      <span class="seo-eyebrow">${esc(data.eyebrow)}</span>
      <h1>${esc(data.title)}</h1>
      <p>${esc(data.intro)}</p>
    </div>
  </section>
  <section class="seo-main">
    <article class="seo-article">
      <div class="seo-cta">
        <p><strong>${esc(data.cta)}</strong></p>
        <div class="seo-button-row">
          <a class="seo-button" href="tel:+6581836772">Call +65 8183 6772</a>
          <a class="seo-button" href="https://wa.me/+6581836772">WhatsApp Us</a>
          <a class="seo-button" href="/contact">Request a Quote</a>
        </div>
      </div>
${data.sections.map(([title, body]) => `      <h2>${esc(title)}</h2>
${Array.isArray(body) ? body.map(renderBlock).join("\n") : body}`).join("\n")}
    </article>
  </section>
</main>
`;
  return { file, html };
}

function bullets(items) {
  return `<ul>${items.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>`;
}

function numbered(items) {
  return `<ol>${items.map((item) => `<li>${esc(item)}</li>`).join("")}</ol>`;
}

function table(headers, rows) {
  return `<table class="seo-table"><thead><tr>${headers.map((h) => `<th>${esc(h)}</th>`).join("")}</tr></thead><tbody>${rows
    .map((row) => `<tr>${row.map((cell) => `<td>${esc(cell)}</td>`).join("")}</tr>`)
    .join("")}</tbody></table>`;
}

function faq(items) {
  return `<div class="seo-faq">${items.map(([q, a]) => `<h3>${esc(q)}</h3><p>${esc(a)}</p>`).join("")}</div>`;
}

function renderBlock(block) {
  if (block.startsWith("<")) return block;
  return `<p>${esc(block)}</p>`;
}

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
