export interface Question {
    id: string;
    text: string;
    traitKey: string;
}

export const questions: Question[] = [
    {
        id: "q_female",
        text: "Is your character female?",
        traitKey: "isFemale",
    },
    {
        id: "q_stark",
        text: "Is your character a member of House Stark?",
        traitKey: "isStark",
    },
    {
        id: "q_lannister",
        text: "Is your character a member of House Lannister?",
        traitKey: "isLannister",
    },
    {
        id: "q_targaryen",
        text: "Is your character a member of House Targaryen?",
        traitKey: "isTargaryen",
    },
    {
        id: "q_baratheon",
        text: "Is your character from House Baratheon?",
        traitKey: "isBaratheon",
    },
    {
        id: "q_tyrell",
        text: "Is your character a member of House Tyrell?",
        traitKey: "isTyrell",
    },
    {
        id: "q_greyjoy",
        text: "Is your character from House Greyjoy?",
        traitKey: "isGreyjoy",
    },
    {
        id: "q_martell",
        text: "Is your character from House Martell?",
        traitKey: "isMartell",
    },
    {
        id: "q_bolton",
        text: "Is your character a Bolton?",
        traitKey: "isBolton",
    },
    {
        id: "q_villain",
        text: "Is your character primarily a villain?",
        traitKey: "isVillain",
    },
    {
        id: "q_fighter",
        text: "Is your character known as a warrior or skilled fighter?",
        traitKey: "isFighter",
    },
    {
        id: "q_magic",
        text: "Does your character possess or use magic?",
        traitKey: "hasMagic",
    },
    {
        id: "q_royal",
        text: "Does your character have royal blood?",
        traitKey: "hasRoyalBlood",
    },
    {
        id: "q_lord",
        text: "Is your character a lord, lady, or at noble rank?",
        traitKey: "isLord",
    },
    {
        id: "q_betrayer",
        text: "Is your character known for a significant betrayal?",
        traitKey: "isBetrayer",
    },
    {
        id: "q_survived",
        text: "Did your character survive to the very end (Season 8)?",
        traitKey: "survivedToEnd",
    },
    {
        id: "q_northerner",
        text: "Is your character from the North (beyond the Neck)?",
        traitKey: "isNortherner",
    },
    {
        id: "q_beyond_wall",
        text: "Has your character spent significant time beyond the Wall?",
        traitKey: "isBeyondWall",
    },
    {
        id: "q_king",
        text: "Did your character ever hold the title of King or Queen?",
        traitKey: "isKing",
    },
    {
        id: "q_sword",
        text: "Is your character particularly known for using a sword?",
        traitKey: "wieldsSword",
    },
    {
        id: "q_direwolf",
        text: "Did your character have a direwolf companion?",
        traitKey: "hasDirewolf",
    },
    {
        id: "q_westerosi",
        text: "Is your character originally from Westeros?",
        traitKey: "isWesterosi",
    },
    {
        id: "q_maester",
        text: "Is your character a maester or closely associated with the Citadel?",
        traitKey: "isMaester",
    },
    {
        id: "q_highborn",
        text: "Was your character born into a noble highborn family?",
        traitKey: "isHighborn",
    },
    {
        id: "q_advisor",
        text: "Did your character serve primarily as a political advisor or Hand?",
        traitKey: "isAdvisor",
    },
    {
        id: "q_children",
        text: "Does your character have children?",
        traitKey: "hasChildren",
    },
    {
        id: "q_nightswatch",
        text: "Did your character take the black and join the Night's Watch?",
        traitKey: "isNightsWatch",
    },
    {
        id: "q_resurrected",
        text: "Was your character killed and brought back to life?",
        traitKey: "diedAndResurrected",
    },
    {
        id: "q_essos",
        text: "Did your character spend significant time in Essos?",
        traitKey: "isFromEssos",
    },
    {
        id: "q_married",
        text: "Was your character ever married?",
        traitKey: "hasBeenMarried",
    },
    {
        id: "q_religious",
        text: "Is your character notably religious or associated with a faith?",
        traitKey: "isReligious",
    },
    {
        id: "q_older_generation",
        text: "Is your character from the older generation (parents' age)?",
        traitKey: "isOlderGeneration",
    },
    {
        id: "q_leader",
        text: "Was your character a military commander or leader of an army?",
        traitKey: "isLeader",
    },
    {
        id: "q_poison",
        text: "Is your character known for using poison?",
        traitKey: "usesPoison",
    },
    {
        id: "q_archery",
        text: "Is your character known for using a bow?",
        traitKey: "usesArchery",
    },
    {
        id: "q_tully",
        text: "Is your character a member of or closely tied to House Tully?",
        traitKey: "isTully",
    },
    {
        id: "q_arryn",
        text: "Is your character associated with House Arryn or the Vale?",
        traitKey: "isArryn",
    },
    {
        id: "q_kingsguard",
        text: "Did your character serve in the Kingsguard?",
        traitKey: "isKingsguard",
    },
    {
        id: "q_smallfolk",
        text: "Is your character a commoner or from the smallfolk?",
        traitKey: "isSmallfolk",
    },
];
