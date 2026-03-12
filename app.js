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

        const showDetails = ref(false); 
        // Controls whether or not the details of a card are displayed.

        const activeCard = ref(null);
        // Used to store the card whose details are displayed when 'Learn More' is clicked.

        const frontIndex = ref(0); 
        // Determines which card is at the front or center of the deck.

        function toggleOpenCloseCard(card){
            activeCard.value = card
            showDetails.value = true
        }
        // Function which labels a card as 'activeCard' once 'Learn More' is clicked and enables its details to be displayed.


        // Array that stores all data about the cards, including the text, images, and position.
        const cards = ref([ 
            {
                unlocked: true, // Will be used in the next step to denote which cards are unlocked, meaning their details can be seen.
                title: "The Bering Strait", // Title used on front and inside dialog of the cards.
                description: "Learn more about the tension between economic growth and environmental protection around the Bering Strait, located between Russia and Alaska.",
                // Brief description on the card's front to encourage the user to click 'Learn More'.
                image: "images/beringstrait.jpg",
                // Image used on the front of the card. Taken from https://www.theatlantic.com/technology/archive/2015/07/superhighway-bering-strait-new-york-paris/397370/
                imageint: "images/beringstraitint.jpg",
                // Image used for the card's dialog. Taken from https://www.britannica.com/place/Bering-Strait
                details: "The Bering Strait is a marine passage between Russia and Alaska that connects the Pacific to the Arctic. Historically, it has represented a bridge allowing for human migration between Asia and North America. In recent years, however, there has been an increased interest in the strait as a route for maritime commerce. Because of the Bering Strait’s importance as a corridor for the migration of marine mammals such as bowhead whales, beluga whales, humpback whales, and Pacific walruses, tension has emerged between the desire for economic gain and for environmental protection. Since many Indigenous communities live nearby and rely on the marine ecosystem for sustenance, the stakes are high for the handling of this tension. Though the absolute volume of traffic in the Bering Strait isn’t high, the region is a uniquely ecologically rich environment surrounded by communities with little experience dealing with large-scale vessel traffic. Increased vessel traffic creates environmental risks such as collisions between vessels and marine life, interference with animal behaviour via noise, and the release of pollutants and oil spills. For the Chukchi, Iñupiaq, St. Lawrence Island Yupik, Siberian Yupik, and Yup’ik peoples who practice traditional ways of food harvesting from the sea in this region, these risks could result in decreased access to food and quality of nutrition. Additionally, a hunter’s boat being struck by a large vessel could be fatal. Through the lens of Traditional Ecological Knowledge (TEK), the tension between economic growth and environmental protection surrounding the Bering Strait presents an opportunity to incorporate Indigenous knowledge into environmental management and policy. For example, a potential measure for reducing environmental harm is the implementation of shipping lanes, ATBAs (Areas to Be Avoided), and precautionary areas. Through consultation with the local Indigenous communities, particularly hunters, a baseline of information about the local environment could be established, assisting the designation of these regions. This consultation is not only important for addressing potential blind spots of Western science, but also for preserving the culture and ways of being of local communities.", 
                // The extended details and analysis of our chose texts. 
                x: "40%",
                y: "20%",
                z: "4"
                // The current position (x,y) and 'layer' (z) of the card. 'z' is used to position cards in front or behind each other, enabling the stacked deck appearance. 
                // SOURCE: https://www.sciencedirect.com/science/article/pii/S0308597X14002012?via%3Dihub
            },
            {
                unlocked: false,
                title: "The Makah Whaling Controversy",
                description: "Learn about the debate between the preservation of Indigenous culture or whale life.",
                image: "images/makahwhaling.jpg",
                // Image taken from https://seashepherd.org/2025/04/10/urgent-block-the-return-of-whaling-in-u-s-waters/
                imageint: "images/makahwhalingint.jpg",
                // Image taken from https://www.knkx.org/environment/2019-11-13/20-years-later-atmosphere-has-changed-around-makah-whale-hunt
                details: "The Makah whaling controversy provides a compelling case study for examining TEK in practice, and the conflict that can arise between Indigenous and secular cultures. The Makah people reside on a coastal reservation in the northwest of Washington State around Neah Bay. The Makah have a long history of marine harvesting and are known particularly for whale hunting. Whaling is not merely an economic activity but a cultural practice embedded in Makah spiritual traditions and community identity. The whale hunt involves ritual preparation, ceremonies, and the distribution of whale meat within the community in a large potlatch afterwards. Following the 1855 Treaty of Neah Bay, the Makah retained the legal right to hunt whales, but stopped in the 1920s after commercial whaling left the Grey whale species endangered. In the 90s, the Makah sought to resume whaling once gray whale populations had recovered, but this decision sparked opposition from animal rights activists and conservation organizations, highlighting tensions between Indigenous cultural rights and contemporary environmental movements. They argue that since whales are endangered and highly intelligent creatures, and that the Makah use modern technology to aid in hunting, modern society should move beyond whaling. This unfortunately led to a lot of racism amongst the public and the media, where conflicting narratives of western and native sciences clashed. This case study offers a unique and challenging narrative from a TEK lens. Modern Western environmental activism justly deems large proportions of whale species as endangered wildlife to be protected. From this perspective, whaling is often viewed as destructive and dangerous to the global ecosystem when performed commercially. TEK tells us the case of the Makah is different, as the whaling practice underscores an important relationship between humans and nature. This cultural practice encourages humans to act not as external protectors of the ecosystem, but integration as participants.",
                x: "45%",
                y: "20%",
                z: "3"
                // SOURCE: https://www.jstor.org/stable/656545
            },
            {
                unlocked: false,
                title: "The Haida Gwaii Marine Plan",
                description: "Learn about how Indigenous leadership can guide ocean development.",
                image: "images/haida.jpg",
                // Image taken from https://thecanadianencyclopedia.ca/en/article/haida-native-group
                imageint: "images/haidaint.jpg",
                // Image taken from https://www.knkx.org/environment/2019-11-13/20-years-later-atmosphere-has-changed-around-makah-whale-hunt
                details: "Back in 2015, the Province of British Columbia worked with the Haida Indigenous community to implement the Haida Gwaii Marine Plan (HGMP) as a part of the Marine Plan Partnership for the North Pacific Coast (MaPP) initiative. The project sought to implement a marine spatial planning initiative designed to guide the sustainable use and protection of the Indigenous waters. This plan involves the recognition of sustainable economic activity within the region, calling for regulation of fishing, shipping traffic, tourism, and other forms of marine development to ensure that economic use of the waters does not compromise ecosystem health. Increasing ship traffic associated with expanding ports in Prince Rupert, Kitimat, and Stewart, along with cruise ship routes and potential industrial development such as oil and natural gas pipelines, has raised concerns about environmental impacts. Shipping activity introduces risks including oil contamination from bilge discharge, increased underwater noise, and potential disruption of marine species. These threats are particularly significant for whales which rely heavily on sound for communication and navigation. The marine plan therefore seeks to guide ocean development in ways that minimize ecological harm while supporting sustainable economic activities. By studying and directing marine activities, shipping can take place within ecological limits and avoids damaging sensitive habitats or disrupting key species such as whales. This case study demonstrates how TEK can inform modern environmental management when Indigenous governance is incorporated into development plans. This serves as an example for how humans can act as stewards to the ecosystem, continuing to use it for economic endeavours, without trampling on TEK.",
                x: "50%",
                y: "20%",
                z: "2"
                // SOURCE: https://mcmaster.primo.exlibrisgroup.com/discovery/fulldisplay?context=L&vid=01OCUL_MU:OMNI&search_scope=OCULDiscoveryNetwork&tab=OCULDiscoveryNetwork&lang=en&docid=alma991033835743907371
            },
            {
                unlocked: false,
                title: "TEK and Beluga Whales",
                description: "Beluga whales are one of the most understood mammals by Arctic Indigenous populations. Learn more about how Traditional Ecological Knowledge of beluga whales is used in marine mammal literature. ",
                image: "images/beluga.jpg",
                // Image taken from https://www.theguardian.com/environment/2017/mar/26/shrinking-sea-ice-threatens-beluga-whale-robin-mckie
                imageint: "images/belugaint.jpg",
                // Image taken from https://oceanographicmagazine.com/news/hvaldimir-russian-spy-beluga-whale-found-dead-in-norway/
                details: "This study uses beluga whales (Delphinapterus leucas) as a case study to examine how Traditional Ecological Knowledge (TEK) from Indigenous communities contributes to marine mammal research in the Arctic. Beluga whales live in remote Arctic regions causing them to be difficult and expensive for scientists to study directly. This has caused researchers to often lack long-term observational data about their behavior, migration, and population trends. However, Indigenous hunters and communities, particularly Inuit in the Canadian Arctic, have extensive knowledge of beluga whales based on generations of close interaction with the environment. Thus researchers conducted a systematic review of 137 academic and grey literature sources that included TEK about beluga whales. They found that Indigenous knowledge has provided valuable information about beluga migration routes, seasonal distribution, habitat use, and population changes, which has helped fill gaps in scientific data and support wildlife management and conservation decisions. However, the study also found that this knowledge is often included informally in research rather than being systematically collected and documented.",
                x: "55%",
                y: "20%",
                z: "1"
                // SOUCRE: https://www.jstor.org/stable/43871397?casa_token=LobOojuAXmgAAAAA%3AHu5LiO0Yj1tekHsgjE38I1QoQ-SdcDrao9I4F26ZBkL69X--qR3X7RBSImsCFTPPKlFdfFvcBYssSu8wVPdte2o-az4ngIYAJctdXil-htHQGQ0croE5&seq=2
            },
            {
                unlocked: false,
                title: "Connecting Science to TEK",
                description: "A whale in their natural ocean environment connects to the Māori concept of kaitiakitanga. Learn more about how kaitiakitanga is connected to Western science to create a more holistic understanding of marine life.",
                image: "images/connecting.jpg",
                // Image taken from https://www.newzealandartwork.com/blog/post/22637/New-Zealand-Landscape-Paintings-at-Group-Show-in-Parnell/
                imageint: "images/connectingint.jpg",
                // Image taken from SOURCE below
                details: "Researchers McAllister et al. examine how Indigenous knowledge can be combined with Western science to improve conservation and environmental management in Aotearoa New Zealand. The authors focus on the Māori concept of kaitiakitanga, which refers to the responsibility of Indigenous communities to care for and protect the environment for future generations. The image illustrates this concept by showing the close relationship between Māori people and the natural environment, emphasizing that humans are not separate from nature but are guardians responsible for maintaining balance within ecosystems. This relationship reflects the Māori worldview that land, water, animals, and people are interconnected through whakapapa (genealogical relationships). Through examples of conservation practices such as rāhui, a traditional method of temporarily restricting resource use to allow ecosystems to recover, the paper demonstrates how Indigenous knowledge provides sustainable approaches to managing ecosystems. This research on connecting science to Indigenous knowledge shows that Indigenous knowledge systems include cultural values, ecological observations, and community practices that complement scientific methods. This approach is particularly valuable when studying marine species such as whales, which can be difficult for scientists to observe consistently across large ocean environments. Indigenous communities often possess generations of knowledge about whale behaviour, migration patterns, feeding areas, and seasonal changes in marine ecosystems. By integrating mātauranga Māori with scientific research methods, researchers can gain a more comprehensive understanding of whales and their ecological roles. Indigenous knowledge can provide long-term observations of whale populations and environmental changes that scientific studies may not capture over shorter timeframes. By working collaboratively with Indigenous communities and integrating mātauranga Māori with scientific research, conservation efforts can become more holistic, culturally respectful, and effective in protecting whales, marine ecosystems, and biodiversity.",
                x: "25%",
                y: "20%",
                z: "1"
                // SOURCE: https://www.jstor.org/stable/48740243?casa_token=WtFOSaR0PyUAAAAA%3AiyuHE7v1F5j-q2J9c-oRyYGO_AcN1mQhXr0Cv28oWSYSwTiEh_rFVXQ5rqsDm3HI2JkmBJHttT1OYoXINwHAN3nlIHi9A1JW_a52hlxzEW3P331Uv9qE&seq=1
            },
            {
                unlocked: false,
                title: "",
                description: "",
                image: "",
                imageint: "",
                details: "",
                x: "30%",
                y: "20%",
                z: "2"
            },
            {
                unlocked: false,
                title: "",
                description: "",
                image: "",
                imageint: "",
                details: "",
                x: "35%",
                y: "20%",
                z: "3"
            }
        ]);

        // Function that updates the positions of the cards based on the value of 'frontIndex'. 
        // The card stored in 'frontIndex' is moved to the center, while the other cards rotate through the deck, preserving the initial order of cards.
        function translateCards() {

            if (frontIndex.value === 0) {
            cards.value[0].x="40%"; 
            cards.value[0].z="4";
            cards.value[1].x="45%"; 
            cards.value[1].z="3";
            cards.value[2].x="50%"; 
            cards.value[2].z="2";
            cards.value[3].x="55%"; 
            cards.value[3].z="1";
            cards.value[4].x="25%"; 
            cards.value[4].z="1";
            cards.value[5].x="30%"; 
            cards.value[5].z="2";
            cards.value[6].x="35%"; 
            cards.value[6].z="3";
            }

            else if (frontIndex.value === 1) {
            cards.value[0].x="35%"; 
            cards.value[0].z="3";
            cards.value[1].x="40%"; 
            cards.value[1].z="4";
            cards.value[2].x="45%"; 
            cards.value[2].z="3";
            cards.value[3].x="50%"; 
            cards.value[3].z="2";
            cards.value[4].x="55%"; 
            cards.value[4].z="1";
            cards.value[5].x="25%"; 
            cards.value[5].z="1";
            cards.value[6].x="30%"; 
            cards.value[6].z="2";
            }

            else if (frontIndex.value === 2) {
            cards.value[0].x="30%"; 
            cards.value[0].z="2";
            cards.value[1].x="35%"; 
            cards.value[1].z="3";
            cards.value[2].x="40%"; 
            cards.value[2].z="4";
            cards.value[3].x="45%"; 
            cards.value[3].z="3";
            cards.value[4].x="50%"; 
            cards.value[4].z="2";
            cards.value[5].x="55%"; 
            cards.value[5].z="1";
            cards.value[6].x="25%"; 
            cards.value[6].z="1";
            }

            else if (frontIndex.value === 3) {
            cards.value[0].x="25%"; 
            cards.value[0].z="1";
            cards.value[1].x="30%"; 
            cards.value[1].z="2";
            cards.value[2].x="35%"; 
            cards.value[2].z="3";
            cards.value[3].x="40%"; 
            cards.value[3].z="4";
            cards.value[4].x="45%"; 
            cards.value[4].z="3";
            cards.value[5].x="50%"; 
            cards.value[5].z="2";
            cards.value[6].x="55%"; 
            cards.value[6].z="1";

            }

            else if (frontIndex.value === 4) {
            cards.value[0].x="55%"; 
            cards.value[0].z="1";
            cards.value[1].x="25%"; 
            cards.value[1].z="1";
            cards.value[2].x="30%"; 
            cards.value[2].z="2";
            cards.value[3].x="35%"; 
            cards.value[3].z="3";
            cards.value[4].x="40%"; 
            cards.value[4].z="4";
            cards.value[5].x="45%"; 
            cards.value[5].z="3";
            cards.value[6].x="50%"; 
            cards.value[6].z="2";
            }

            else if (frontIndex.value === 5) {
            cards.value[0].x="50%"; 
            cards.value[0].z="2";
            cards.value[1].x="55%"; 
            cards.value[1].z="1";
            cards.value[2].x="25%"; 
            cards.value[2].z="1";
            cards.value[3].x="30%"; 
            cards.value[3].z="2";
            cards.value[4].x="35%"; 
            cards.value[4].z="3";
            cards.value[5].x="40%"; 
            cards.value[5].z="4";
            cards.value[6].x="45%"; 
            cards.value[6].z="3";
            }

            else {
            cards.value[0].x="45%"; 
            cards.value[0].z="3";
            cards.value[1].x="50%"; 
            cards.value[1].z="2";
            cards.value[2].x="55%"; 
            cards.value[2].z="1";
            cards.value[3].x="25%"; 
            cards.value[3].z="1";
            cards.value[4].x="30%"; 
            cards.value[4].z="2";
            cards.value[5].x="35%"; 
            cards.value[5].z="3";
            cards.value[6].x="40%"; 
            cards.value[6].z="4";
            }
        }       

        // Makes these variables and functions available to the Vue template, allowing them to react to changes and user interactions of those functions.
        return { 
            findCoordinates,
            frontIndex,
            cards,
            translateCards, 
            showDetails, 
            toggleOpenCloseCard,
            activeCard,
            showHelp
        }
    }
}



createApp(App).use(vuetify).mount('#app');
