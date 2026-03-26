const { createApp, ref } = Vue;
const { createVuetify } = Vuetify;
const vuetify = createVuetify();

// NEXT STEPS
// 1. Complete the last 2 cards
// 2. Source our images and resources directly in our module
// 3. Add a question for each card that will unlock the next card if answered correctly by the user
// 4. Revise the module's title to tie all the cards together

const App = {
    setup() {

        function findCoordinates(event) {
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            const xPercent = (event.clientX / windowWidth) * 100;
            const yPercent = (event.clientY / windowHeight) * 100;
            console.log(`X: ${xPercent.toFixed(2)}%, Y: ${yPercent.toFixed(2)}%`);
        }
        // Helper function to find the coordinates in the screen from lab 4



        const showHelp = ref(false);
        // Controls whether or not the 'help' dialog from the top right button appears.

        const frontIndex = ref(2);
        // Determines which card is at the front or center of the deck.

        const navDrawerOpen = ref(false);
        
        function openNavDrawer() {
            navDrawerOpen.value = !navDrawerOpen.value;
        }

        function toggleOpenCloseCard(card) {
            if (card.showDetails == false) {
                card.showDetails = true
            } else {
                card.showDetails = false
            }
        }

        // a function to unlock the next card
        function unlockNextCard(card, cardIndex, userAnswer) {

            if (userAnswer === card.unlockAnswer) {
                card.feedback = "Correct!";
                card.feedbackColor = "green";
                card.answeredCorrectly = true;

                if (cardIndex < cards.value.length - 1) {
                    cards.value[cardIndex + 1].unlocked = true;
                }

                else {
                    cards.value[0].unlocked = true;
                }
            } else {
                card.feedback = "Wrong. Try again.";
                card.feedbackColor = "red";
                card.answeredCorrectly = false;
            }
        }

        // Array that stores all data about the cards, including the text, images, and position.
        const cards = ref([
            {
                showDetails: false,
                unlocked: false, // Will be used in the next step to denote which cards are unlocked, meaning their details can be seen.
                unlockQuestion: "Increased vessel traffic in the Bering Strait only poses risk to marine life.",
                unlockAnswer: false,
                feedback: "",
                feedbackColor: "",
                answeredCorrectly: false,
                title: "The Bering Strait", // Title used on front and inside dialog of the cards.
                description: "Learn about the tension between economic growth and environmental protection around the Bering Strait, located between Russia and Alaska.",
                // Brief description on the card's front to encourage the user to click 'Learn More'.
                image: "images/beringstrait.jpg",
                // Image used on the front of the card. Taken from https://www.theatlantic.com/technology/archive/2015/07/superhighway-bering-strait-new-york-paris/397370/
                imageint: "images/beringstraitint.jpg",
                // Image used for the card's dialog. Taken from https://www.britannica.com/place/Bering-Strait
                par1: "The Bering Strait is a marine passage between Russia and Alaska that connects the Pacific to the Arctic. Historically, it has represented a bridge allowing for human migration between Asia and North America. In recent years, however, there has been an increased interest in the strait as a route for maritime commerce. Because of the Bering Strait’s importance as a corridor for the migration of marine mammals such as bowhead whales, beluga whales, humpback whales, and Pacific walruses, tension has emerged between the desire for economic gain and for environmental protection. Since many Indigenous communities live nearby and rely on the marine ecosystem for sustenance, the stakes are high for the handling of this tension.",
                par2: "Though the absolute volume of traffic in the Bering Strait isn’t high, the region is a uniquely ecologically rich environment surrounded by communities with little experience dealing with large-scale vessel traffic. Increased vessel traffic creates environmental risks such as collisions between vessels and marine life, interference with animal behaviour via noise, and the release of pollutants and oil spills. For the Chukchi, Iñupiaq, St. Lawrence Island Yupik, Siberian Yupik, and Yup’ik peoples who practice traditional ways of food harvesting from the sea in this region, these risks could result in decreased access to food and quality of nutrition. Additionally, a hunter’s boat being struck by a large vessel could be fatal.",
                par3: "Through the lens of Traditional Ecological Knowledge (TEK), the tension between economic growth and environmental protection surrounding the Bering Strait presents an opportunity to incorporate Indigenous knowledge into environmental management and policy. For example, a potential measure for reducing environmental harm is the implementation of shipping lanes, ATBAs (Areas to Be Avoided), and precautionary areas. Through consultation with the local Indigenous communities, particularly hunters, a baseline of information about the local environment could be established, assisting the designation of these regions. This consultation is not only important for addressing potential blind spots of Western science, but also for preserving the culture and ways of being of local communities.",
                // The extended details and analysis of our chose texts. 
                x: "25%",
                y: "20%",
                z: "1"
                // The current position (x,y) and 'layer' (z) of the card. 'z' is used to position cards in front or behind each other, enabling the stacked deck appearance. 
                // SOURCE: https://www.sciencedirect.com/science/article/pii/S0308597X14002012?via%3Dihub
            },
            {
                showDetails: false,
                unlocked: false,
                unlockQuestion: "Ecosystem based management (EBM) in the plan requires that human well being and governance be considered alongside ecological integrity.",
                unlockAnswer: true,
                feedback: "",
                feedbackColor: "",
                answeredCorrectly: false,
                title: "The Haida Gwaii Marine Plan",
                description: "Learn about how Indigenous leadership can guide ocean development.",
                image: "images/haida.jpg",
                // Image taken from https://thecanadianencyclopedia.ca/en/article/haida-native-group
                imageint: "images/haidaint.jpg",
                // Image taken from https://www.knkx.org/environment/2019-11-13/20-years-later-atmosphere-has-changed-around-makah-whale-hunt
                par1: "The Haida Gwaii Marine Plan (2015) is a collaborative project established between the Council of the Haida Nation and the Province of British Columbia to ensure the extended health and sustainable use of the archipelago’s marine environment. Developed over three years the plan provides comprehensive management direction for marine activities within the jurisdictional authority of both governments. This plan involves the recognition for implementing sustainable economic activity within the region, calling for the regulation of fishing, shipping traffic, tourism, and other forms of marine development to ensure that economic use of the waters does not compromise ecosystem health. Increasing ship traffic associated with expanding ports in Prince Rupert, Kitimat, and Stewart, along with cruise ship routes and potential industrial development such as oil and natural gas pipelines, has raised concerns about environmental impacts. Shipping activity introduces risks including oil contamination from bilge discharge, increased underwater noise, and potential disruption of marine species. These threats are particularly significant for whales which rely heavily on sound for communication and navigation.",
                par2: "The plan is implemented through an ecosystem-based management (EBM) framework that prioritizes ecological integrity. Central to this approach is a spatial zoning strategy that divides the marine area into three distinct categories. The first is General Management Zones (GMZ), where a full range of sustainable activities and research occurs. Special Management Zones (SMZ) prioritize high potential sustainable uses like renewable energy or aquaculture. Lastly, Protection Management Zones (PMZ) focus on the conservation of sensitive ecological and cultural values. By coordinating these zones, the plan aims to balance industries such as marine tourism, shellfish aquaculture, and renewable energy with the critical need to maintain healthy, intact habitats. EBM clarifies important restricted regions from shipping routes, helping to mitigate whale strikes and pollutants.",
                par3: "A defining feature of the Haida Gwaii Marine Plan is its deep integration of TEK through Haida traditional and local knowledge. This knowledge was foundational to the planning process, since it used Haida TEK to identify regions of cultural, spiritual, and stewardship importance. The plan’s EBM principles are explicitly mapped to Haida ethics and values, such as Yahguudang (Respect), Ad Kyah ga t'alang t'asig (Seeking Wise Counsel), and Gina 'waadluxan gud ad kwagid (Interconnectedness). By rooting management strategies in these ancestral teachings, the plan ensures that traditions are protected while applying generational indigenous guidance to modern conservation challenges.",
                x: "30%",
                y: "20%",
                z: "2"
                // SOURCE: https://mcmaster.primo.exlibrisgroup.com/discovery/fulldisplay?context=L&vid=01OCUL_MU:OMNI&search_scope=OCULDiscoveryNetwork&tab=OCULDiscoveryNetwork&lang=en&docid=alma991033835743907371
            },
            {
                showDetails: false,
                unlocked: true,
                unlockQuestion: "TEK only adds cultural context to beluga whale conservation.",
                unlockAnswer: false,
                feedback: "",
                feedbackColor: "",
                answeredCorrectly: false,
                title: "TEK, Beluga Whales and Arctic Shipping",
                description: "Learn more about how TEK protects Beluga whales from Arctic Shipping",
                image: "images/beluga.jpg",
                // Image taken from https://www.theguardian.com/environment/2017/mar/26/shrinking-sea-ice-threatens-beluga-whale-robin-mckie
                imageint: "images/belugaint.jpg",
                // Image taken from https://oceanographicmagazine.com/news/hvaldimir-russian-spy-beluga-whale-found-dead-in-norway/
                par1: "Traditional Ecological Knowledge (TEK) is often treated as secondary to scientific data, yet scholars have shown that it has major implications for Arctic marine governance because it preserves long-term knowledge of animal movement, seasonal change, ice conditions, and human relationships to water that state and commercial systems often overlook. In Arctic marine mammal research, TEK has been recognized as especially valuable because marine mammals are difficult and expensive to monitor, and scientific observation is often limited by remoteness, ice, and seasonal conditions. For beluga whales in particular, scholars have shown that TEK contributes knowledge about distribution, migratory routes, stock structure, and environmental change that scientific research alone may not fully capture. From this perspective, Arctic waters are not neutral corridors of economic movement, but living environments already shaped by ecological patterns and Indigenous relationships to place.",
                par2: "This matters for beluga whales because TEK has helped expand research beyond a narrow biological focus toward broader questions of management and co-management. Scholars have shown that Indigenous knowledge contributes not only to understanding where belugas travel and how they respond to environmental conditions, but also to identifying the kinds of ecological knowledge needed for conservation and long-term stewardship. TEK is especially important because it is rooted in sustained, place-based observation and in close interaction with Arctic marine environments over generations. As a result, it can provide complementary temporal and spatial perspectives that are often missing from short-term scientific studies. This makes TEK highly relevant to shipping debates, since shipping lanes are not simply technical routes across empty water. They pass through marine spaces already structured by migration, seasonal habitat use, and Indigenous knowledge of environmental change.",
                par3: "The conflict between TEK and maritime commerce cannot be reduced to a simple tension between tradition and development, rather it reflects a deeper imbalance in whose knowledge is allowed to organize marine space. Scholars have noted that TEK has made substantial contributions to beluga research, yet it is still too often included only informally, anecdotally, or after major management frameworks have already been established. When this happens, Indigenous knowledge is treated as something that merely supplements scientific management rather than helping shape it from the outset. A more just approach would recognize TEK as a form of environmental authority that should guide decisions about marine development, including shipping expansion, before routes and policies are finalized. Ultimately, decisions about Arctic shipping are never merely logistical. They are political choices about whether marine space is understood as a commercial corridor for transit and extraction or as a living relational environment whose ecologies, histories, and communities must shape the terms of development.",
                x: "35%",
                y: "20%",
                z: "3"
                // SOUCRE: https://www.jstor.org/stable/43871397?casa_token=LobOojuAXmgAAAAA%3AHu5LiO0Yj1tekHsgjE38I1QoQ-SdcDrao9I4F26ZBkL69X--qR3X7RBSImsCFTPPKlFdfFvcBYssSu8wVPdte2o-az4ngIYAJctdXil-htHQGQ0croE5&seq=2
            },
            {
                showDetails: false,
                unlocked: false,
                unlockQuestion: "The conflict between the Makah and secular conservationists is rooted in a fundamental disagreement over whether whales are private communal relations within a specific territory or open-access global resources.",
                unlockAnswer: true,
                feedback: "",
                feedbackColor: "",
                answeredCorrectly: false,
                title: "The Makah Whaling Controversy",
                description: "Learn about the Makah whaling controversy and how TEK, maritime commerce, and modern conservation views collide over whale use.",
                image: "images/makahwhaling.jpg",
                // Image taken from https://seashepherd.org/2025/04/10/urgent-block-the-return-of-whaling-in-u-s-waters/
                imageint: "images/makahwhalingint.jpg",
                // Image taken from https://www.knkx.org/environment/2019-11-13/20-years-later-atmosphere-has-changed-around-makah-whale-hunt
                par1: "The Makah whaling controversy provides a compelling case study for examining TEK in practice, and the conflict that can arise between Indigenous and secular cultures when considering the use of natural resources. Under the 1855 Treaty of Neah Bay, the Makah retained the right to hunt whales in a time period where American and European whaling fleets were already aggressively expanding into the Pacific. The maritime trade of whale oil, blubber, and meat was seen as a luxury resource frontier. The treaty wasn’t originally signed out of fear for a legal ban on whaling, but to solve territorial disputes as an influx of commercial shipping vessels invaded indigenous waters and threatened the traditional fishing economy. By the 20th century, commercial whaling had left the population near extinct. As such, whaling diminished and the Makah voluntarily halted hunting whales for over 70 years. In the 1990s, the Makah sought to resume whaling once the gray whale populations had recovered, but this decision sparked opposition from animal rights activists and conservation organizations, highlighting tensions between TEK and secular understandings of whales as a resource.",
                par2: "Indigenous perspective: After American shipping vessels hunted Gray Whales to near extinction, then proclaimed them a protected species, Makah cultural rights have been deemed near worthless. As such, over the decades, there has been a fear for the erasure of many traditional practices and values tied to the whale hunt. The original treaty worked to suppress Makah territories to protect commercial whale trade, but acknowledged their right to fish, yet the Makah continued to fight long bureaucratic battles to retain these rights despite the guaranteed treaty protections. Whaling had traditionally been a form of subsistence for the Makah, but also a form of communing with neighbouring tribes and kin in large ‘potlachs’, as well as a method of passing on knowledge and forging and reinforcing social hierarchies through hunting and communication with nature. Western perspective: Preservationists fear the reintroduction of whaling in North America is a slippery slope, highlighting the continued demand for whale products as a luxury good internationally. They also argue that whales are endangered and highly intelligent creatures. Since the Makah use modern technology to aid in hunting, modern society should move beyond whaling. This has unfortunately led to a lot of racism from the public and the media towards the Makah people.",
                par3: "TEK: The case highlights the differing perspectives of whales as a capitalist driven traded commodity compared to a form of Aboriginal subsistence. The conflict stems from the secular understanding of “free marine resources as open-access commons”, whereas the Makah believe in the tending of their customary waters and their proprietary right to the resource within them. Where whales can be seen as a good to be exploited and traded around the globe, the Makah see whaling as an important relationship between humans and nature, highlighting how resources are used, treated, and traded amongst communities compared to its exploitation for profits or industry.",
                x: "40%",
                y: "20%",
                z: "2"
                // SOURCE: https://www.jstor.org/stable/656545, https://www.envirosociety.org/2021/03/lines-in-the-water-thinking-about-access-tenure-and-practice-in-traditional-marine-hunting-communities/#:~:text=The%20Treaty%20of%20Neah%20Bay,admission%20of%20their%20marine%20tenure.
            },
            {
                showDetails: false,
                unlocked: false,
                unlockQuestion: "Effective conservation of Southern Resident Killer Whales can rely on biological population data alone, since Traditional Ecological Knowledge mainly adds cultural meaning rather than practical conservation value.",
                unlockAnswer: false,
                feedback: "",
                feedbackColor: "",
                answeredCorrectly: false,
                title: "TEK in Orca Protection",
                description: "Learn how TEK can help protect orca whales.",
                image: "images/orca.jpg",
                // Image taken from https://www.newzealandartwork.com/blog/post/22637/New-Zealand-Landscape-Paintings-at-Group-Show-in-Parnell/
                imageint: "images/orcaint.jpg",
                // Image taken from SOURCE below
                par1: "The Southern Resident Killer Whales are a critically endangered population that inhabit the Salish Sea and surrounding waters of the Pacific Northwest. Their population has declined because of habitat degradation, reduced prey availability, pollution, and vessel disturbance. Studies in 2025 estimated that only around 75 Southern Resident orcas remained. One of the greatest threats to their survival is the decline of Chinook salmon, their primary food source, which leaves the whales without enough energy to survive and reproduce successfully. Pollution further harms the population as toxic contaminants accumulate in their bodies and food web, weakening their health. Vessel disturbance also disrupts their echolocation, communication, and ability to hunt effectively. Because the Salish Sea is a major shipping corridor and economic gateway between Canada and the United States, these human pressures remain a serious obstacle to the recovery of Southern Resident Killer Whales.",
                par2: "Effective conservation of Southern Resident Killer Whales cannot rely only on biological data about whale populations. Many scholars argue that whale protection requires integrating multiple forms of knowledge, including Traditional Ecological Knowledge (TEK) and social science perspectives, to better understand how governance, marine industry, local communities, and long-term ecological relationships shape whale survival. TEK is especially valuable because it reflects generations of place-based observation and close interaction with marine ecosystems. It can provide insights into whale behaviour, environmental change, and ecosystem relationships that scientific monitoring alone may not fully capture. At the same time, TEK contributes ethical frameworks of relational responsibility, showing how humans ought to act toward endangered whales. In this way, combining Indigenous knowledge with biological and social science research can produce conservation strategies that are more inclusive, reciprocal, and effective.",
                par3: "Indigenous communities along the Pacific Northwest coast have longstanding cultural relationships with killer whales and often understand them as relatives within the marine environment. This worldview emphasizes that humans and animals are interconnected and that caring for whales is part of caring for the broader ecosystem. Such knowledge has informed conservation in practical ways. One important example is the Lummi Nation’s effort to raise salmon specifically to feed Southern Resident Killer Whales. The picture linked to this card captures the ceremonial feeding ceremony. This response was grounded in TEK, long-held knowledge of whale needs, and an Indigenous ethic of responsibility toward the whales as family. The example shows that TEK does not simply add cultural meaning to conservation, it can also guide concrete recovery actions that support more effective and holistic protection strategies.",
                x: "45%",
                y: "20%",
                z: "1"
                // SOURCE: https://www.jstor.org/stable/48740243?casa_token=WtFOSaR0PyUAAAAA%3AiyuHE7v1F5j-q2J9c-oRyYGO_AcN1mQhXr0Cv28oWSYSwTiEh_rFVXQ5rqsDm3HI2JkmBJHttT1OYoXINwHAN3nlIHi9A1JW_a52hlxzEW3P331Uv9qE&seq=1
            }   
        ]);

        // Function that updates the positions of the cards based on the value of 'frontIndex'. 
        // The card stored in 'frontIndex' is moved to the center, while the other cards rotate through the deck, preserving the initial order of cards.
        function translateCards() {

            if (frontIndex.value === 0) {
                cards.value[0].x = "35%";
                cards.value[0].z = "4";
                cards.value[1].x = "40%";
                cards.value[1].z = "3";
                cards.value[2].x = "45%";
                cards.value[2].z = "2";
                cards.value[3].x = "25%";
                cards.value[3].z = "2";
                cards.value[4].x = "30%";
                cards.value[4].z = "3";
            }

            else if (frontIndex.value === 1) {
                cards.value[0].x = "30%";
                cards.value[0].z = "3";
                cards.value[1].x = "35%";
                cards.value[1].z = "4";
                cards.value[2].x = "40%";
                cards.value[2].z = "3";
                cards.value[3].x = "45%";
                cards.value[3].z = "2";
                cards.value[4].x = "25%";
                cards.value[4].z = "2";}

            else if (frontIndex.value === 2) {
                cards.value[0].x = "25%";
                cards.value[0].z = "2";
                cards.value[1].x = "30%";
                cards.value[1].z = "3";
                cards.value[2].x = "35%";
                cards.value[2].z = "4";
                cards.value[3].x = "40%";
                cards.value[3].z = "3";
                cards.value[4].x = "45%";
                cards.value[4].z = "2";
            }

            else if (frontIndex.value === 3) {
                cards.value[0].x = "45%";
                cards.value[0].z = "2";
                cards.value[1].x = "25%";
                cards.value[1].z = "2";
                cards.value[2].x = "30%";
                cards.value[2].z = "3";
                cards.value[3].x = "35%";
                cards.value[3].z = "4";
                cards.value[4].x = "40%";
                cards.value[4].z = "3";

            }

            else if (frontIndex.value === 4) {
                cards.value[0].x = "40%";
                cards.value[0].z = "3";
                cards.value[1].x = "45%";
                cards.value[1].z = "2";
                cards.value[2].x = "25%";
                cards.value[2].z = "2";
                cards.value[3].x = "30%";
                cards.value[3].z = "3";
                cards.value[4].x = "35%";
                cards.value[4].z = "4";
            }

        }


        // Makes these variables and functions available to the Vue template, allowing them to react to changes and user interactions of those functions.
        return {
            findCoordinates,
            frontIndex,
            cards,
            translateCards,
            // showDetails,
            toggleOpenCloseCard,
            // activeCard,
            showHelp,
            unlockNextCard,
            navDrawerOpen,
            openNavDrawer
        }
    }
}



createApp(App).use(vuetify).mount('#app');
