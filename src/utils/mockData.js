
export const expenses = [
  {
    id: 1,
    personName: "Alex Chen",
    personImage: "",
    eventName: "Weekend Camping",
    eventImage: "",
    description: "Tent rental",
    date: "2024-12-15",
    amount: 40,
    type: "owe",
    settled: false
  },
  {
    id: 2,
    personName: "Sam Lee",
    personImage: "",
    eventName: "Birthday Party",
    eventImage: "",
    description: "Birthday cake",
    date: "2025-01-05",
    amount: 25,
    type: "owed",
    settled: false
  },
  {
    id: 3,
    personName: "Jordan Smith",
    personImage: "",
    eventName: "Team Building",
    eventImage: "",
    description: "Escape room tickets",
    date: "2024-12-22",
    amount: 35,
    type: "owed",
    settled: false
  },
  {
    id: 4,
    personName: "Taylor Kim",
    personImage: "",
    eventName: "Road Trip",
    eventImage: "",
    description: "Gas expenses",
    date: "2025-01-12",
    amount: 28.50,
    type: "owe",
    settled: false
  },
  {
    id: 5,
    personName: "Casey Nguyen",
    personImage: "",
    eventName: "Housewarming",
    eventImage: "",
    description: "Drinks & snacks",
    date: "2024-12-18",
    amount: 45,
    type: "owe",
    settled: false
  },
  {
    id: 6,
    personName: "Riley Jones",
    personImage: "",
    eventName: "Lake Day",
    eventImage: "",
    description: "Kayak rental",
    date: "2025-01-08",
    amount: 60,
    type: "owe",
    settled: false
  },
  {
    id: 7,
    personName: "Jamie Park",
    personImage: "",
    eventName: "BBQ Party",
    eventImage: "",
    description: "Meat and supplies",
    date: "2024-12-28",
    amount: 42.75,
    type: "owed",
    settled: false
  },
  {
    id: 8,
    personName: "Morgan Lee",
    personImage: "",
    eventName: "Concert Night",
    eventImage: "",
    description: "Ticket reimbursement",
    date: "2025-01-15",
    amount: 85,
    type: "owed",
    settled: false
  },
  {
    id: 9,
    personName: "Charlie Brown",
    personImage: "",
    eventName: "Weekend Hike",
    eventImage: "",
    description: "Trail permits",
    date: "2024-12-10",
    amount: 15,
    type: "owe",
    settled: false
  },
  {
    id: 10,
    personName: "Pat Williams",
    personImage: "",
    eventName: "Game Night",
    eventImage: "",
    description: "Snacks and drinks",
    date: "2025-01-02",
    amount: 22.30,
    type: "owe",
    settled: false
  }
];

export const events = [
  {
    groupName: 'Group Name',
    eventName: 'Biking',
    date: new Date(),
    location: 'The Embarcadero, San Francisco, CA, 94133',
    image: '',
    users: ['Sam Johnson', 'Josie Rein', 'Jane Doe', 'Sellie Nosh'],
    description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus praesentium sequi eius modi in voluptatibus necessitatibus cum esse numquam, quae error repudiandae atque velit qui fuga, reiciendis accusamus ipsum ex. 
      Odit modi rem quis distinctio, sit fugit, aspernatur reiciendis, labore atque nemo accusamus possimus aliquid consectetur dolorem repudiandae est sapiente tempora nam aperiam cum? Maiores hic laboriosam reprehenderit tempora ratione.
      A, excepturi mollitia magnam animi deserunt hic dolorem eum consectetur nobis corporis porro vitae accusamus, asperiores eligendi. Molestias soluta quos dolores obcaecati ab vel tempora beatae impedit! Similique, animi quaerat.
      Voluptatum sunt dolore tempora explicabo delectus, impedit blanditiis doloremque qui obcaecati sit quam consequatur unde! Ipsum odit voluptate molestias velit dignissimos veniam tempora illo omnis voluptatibus, soluta ullam sit eligendi!
      Nobis eum, quam quae asperiores facere harum aut laboriosam, aliquam necessitatibus unde doloremque natus in eos odio repudiandae voluptates, quisquam magnam voluptate. Molestias quo omnis mollitia quia impedit animi atque?`,
  },
  {
    groupName: 'Group Name',
    eventName: 'Hiking',
    date: new Date(),
    location: 'The Embarcadero, San Francisco, CA, 94133',
    image: '',
    users: ['Emily Wilson', 'Maxwell Lee', 'Ava Morales', 'Liam Chen'],
    description: 'description',
  },
];

export const groups = [
  {
    groupName: 'Group Name',
    users: ['Sam Johnson', 'Josie Rein', 'Jane Doe', 'Sellie Nosh'],
    description: 'description',
    image: '',
    events: [
      {
        groupName: 'Group Name',
        eventName: 'Event Name',
        date: new Date(),
        location: 'The Embarcadero, San Francisco, CA, 94133',
        image: '',
        users: ['Sam Johnson', 'Josie Rein', 'Jane Doe', 'Sellie Nosh'],
        description: 'description',
      },
      {
        groupName: 'Group Name',
        eventName: 'Event Name',
        date: new Date(),
        location: 'The Embarcadero, San Francisco, CA, 94133',
        image: '',
        users: ['Sam Johnson', 'Josie Rein', 'Jane Doe', 'Sellie Nosh'],
        description: 'description',
      },
    ],
  },
  {
    groupName: 'Group Name',
    users: ['Sam Johnson', 'Josie Rein', 'Jane Doe'],
    description: 'description',
    image: '',
    events: [
      {
        groupName: 'Group Name',
        eventName: 'Event Name',
        date: new Date(),
        location: 'The Embarcadero, San Francisco, CA, 94133',
        image: '',
        users: ['Sam Johnson', 'Josie Rein', 'Jane Doe', 'Sellie Nosh'],
        description: 'description',
      },
    ],
  },
];
