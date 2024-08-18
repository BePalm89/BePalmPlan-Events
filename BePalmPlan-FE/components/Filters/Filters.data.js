export const FILTERS = [
    {
        name: 'date',
        options: [
            { label: 'any date', value: ''},
            { label: 'today', value:'today'},
            { label: 'tomorrow', value:'tomorrow'},
            { label: 'this week', value:'this-week'},
            { label: 'this week', value:'this-week'},
            { label: 'next week', value:'next-week'},
        ]
    },
    {
        name: 'type',
        options: [
            { label: 'any type', value: ''},
            { label: 'online', value:'online'},
            { label: 'in person', value:'in-person'},
        ]
    },
    {
        name: 'category',
        options: [
            { label: 'any categories', value: ''},
            { label: 'health and wellbeing', value:'health-wellbeing'},
            { label: 'art and culture', value:'art-culture'},
            { label: 'travel and outdoor', value:'travel-outdoor'},
            { label: 'sport and fitness', value:'sport-fitness'},
            { label: 'social activities', value:'social-activities'},
            { label: 'technology', value:'technology'},
            { label: 'hobbies and passions', value:'hobbies-passions'},
        ]
    },
    {
        name: 'sorting',
        options: [
            { label: 'sort by: date', value: 'date'},
            { label: 'sort by: relevance', value:'relevance'},
        ]
    },
]