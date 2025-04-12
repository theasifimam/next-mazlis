import { Conversation } from "../_types/conversations";

export const conversations: Conversation[] = [
    {
        id: 1,
        customer: {
          id: 1,
          name: "Asif Imam",
          email: "asifimam@shop.com",
          avatar: "https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg?t=st=1743303365~exp=1743306965~hmac=b48b49c8efd18075481a9f91d3b59decc3cfb61af9d2c39005d25c0919e6cace&w=740",
          lastActive: "2 min ago",
        },
        lastMessage: "Thanks for the quick response!",
        unread: 3,
        messages: [
          {
            id: 1,
            sender: "customer",
            text: "Hi there, I have a question about my order #12345",
            time: "7:43 AM",
            groupPosition: "first",
            status:"read",
            isNew:false,
          },
          {
            id: 2,
            sender: "customer",
            text: "I placed it 3 days ago but haven't received any shipping confirmation yet",
            time: "7:43 AM",
            groupPosition: "middle",
            status:'read',
            isNew:false,
          },
          {
            id: 3,
            sender: "customer",
            text: "Is everything okay with my order?",
            time: "7:43 AM",
            groupPosition: "last",
            status:'read',
            isNew:false,
          },
          {
            id: 4,
            sender: "admin",
            text: "Hello Asif! Thanks for reaching out",
            time: "7:45 AM",
            groupPosition: "first",
            status:'read',
            isNew:false,
          },
          {
            id: 5,
            sender: "admin",
            text: "I've checked your order #12345 and it's currently being processed",
            time: "7:45 AM",
            groupPosition: "middle",
            status:'delivered',
            isNew:false,
          },
          {
            id: 6,
            sender: "admin",
            text: "We had a slight delay due to high order volume but it should ship today",
            time: "7:45 AM",
            groupPosition: "last",
            status: "delivered",
            isNew:false,
          },
          {
            id: 7,
            sender: "customer",
            text: "Oh I see, that's good to know",
            time: "7:46 AM",
            groupPosition: "first",
            status: "delivered",
            isNew:false,
          },
          {
            id: 8,
            sender: "customer",
            text: "Can you tell me what items are included in this order?",
            time: "7:47 AM",
            groupPosition: "middle",
            status: "delivered",
            isNew:false,
          },
          {
            id: 9,
            sender: "customer",
            text: "I think I might have ordered the wrong size for one of the t-shirts",
            time: "7:47 AM",
            groupPosition: "last",
            status: "delivered",
            isNew:false,
          },
          {
            id: 10,
            sender: "admin",
            text: "Let me pull up your order details...",
            time: "7:49 AM",
            groupPosition: "first",
            status: "delivered",
            isNew:false,
          },
          {
            id: 11,
            sender: "admin",
            text: "You have: 1x Black Premium T-Shirt (Size L), 1x Blue Jeans (Size 32), and 1x White Sneakers (Size 10)",
            time: "7:50 AM",
            groupPosition: "middle",
            status: "delivered",
            isNew:false,
          },
          {
            id: 12,
            sender: "admin",
            text: "Which item would you like to change?",
            time: "7:50 AM",
            groupPosition: "last",
            status: "delivered",
            isNew:false,
          },
          {
            id: 13,
            sender: "customer",
            text: "The t-shirt should be Size M instead of L",
            time: "7:51 AM",
            groupPosition: "single",
            status: "delivered",
            isNew:false,
          },
          {
            id: 14,
            sender: "admin",
            text: "Noted! I've updated your order to Size M",
            time: "7:52 AM",
            groupPosition: "first",
            status: "delivered",
            isNew:false,
          },
          {
            id: 15,
            sender: "admin",
            text: "I've also added priority shipping at no extra cost to make up for the delay",
            time: "7:52 AM",
            groupPosition: "last",
            status: "delivered",
            isNew:false,
          },
          {
            id: 16,
            sender: "customer",
            text: "Wow, that's amazing! Thank you so much!",
            time: "7:53 AM",
            groupPosition: "first",
            status: "delivered",
            isNew:false,
          },
          {
            id: 17,
            sender: "customer",
            text: "One last thing - will I get a notification when it ships?",
            time: "7:53 AM",
            groupPosition: "middle",
            status: "delivered",
            isNew:false,
          },
          {
            id: 18,
            sender: "customer",
            text: "And can you confirm the estimated delivery date?",
            time: "7:53 AM",
            groupPosition: "last",
            status: "delivered",
            isNew:false,
          },
          {
            id: 19,
            sender: "admin",
            text: "Yes, you'll receive an email with tracking info as soon as it ships",
            time: "7:55 AM",
            groupPosition: "first",
            status: "delivered",
            isNew:false,
          },
          {
            id: 20,
            sender: "admin",
            text: "With priority shipping, you should receive it within 2 business days after shipment",
            time: "7:55 AM",
            groupPosition: "middle",
            status: "delivered",
            isNew:false,
          },
          {
            id: 21,
            sender: "admin",
            text: "So likely by Wednesday at the latest",
            time: "7:55 AM",
            groupPosition: "last",
            status: "delivered",
            isNew:true,
          },
          {
            id: 22,
            sender: "customer",
            text: "Perfect! That works for me",
            time: "7:56 AM",
            groupPosition: "first",
            status: "delivered",
            isNew:true,
          },
          {
            id: 23,
            sender: "customer",
            text: "Thanks for the quick response!",
            time: "7:56 AM",
            groupPosition: "last",
            status: "delivered",
            isNew:true,
          }
        ]
      },

  {
    id: 2,
    customer: {
      id: 1,
      name: "Kamal Ashraf",
      email: "sarah@example.com",
      avatar: "https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?t=st=1743303401~exp=1743307001~hmac=817cee7664d4c8f236573f4704b3c2cb99d84171b7f4f0105faa487ae187c833&w=740",
      lastActive: "2 min ago",
    },
    lastMessage: "Thanks for the quick response!",
    unread: 19,
    messages: [
      {
        id: 1,
        sender: "customer",
        text: "Hi, I have a question about my order #12345",
        time: "10:30 AM",
        groupPosition: "first",
        status: "delivered",
        isNew:false,
      },
      // ... rest of the messages
    ],
  },

  {
    id: 3,
    customer: {
      id: 1,
      name: "Hanjalah Rahmani",
      email: "sarah@example.com",
      avatar: "https://img.freepik.com/premium-photo/men-design-logo-avatar_665280-69427.jpg?w=740",
      lastActive: "34 min ago",
    },
    lastMessage: "Thanks for the quick response!",
    unread: 3,
    messages: [
      {
        id: 1,
        sender: "customer",
        text: "Hi, I have a question about my order #12345",
        time: "03:53 AM",
        groupPosition: "first",
        status: "delivered",
        isNew:false,
      },
      // ... rest of the messages
    ],
  },

  {
    id: 4,
    customer: {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      avatar: "/avatars/01.png",
      lastActive: "2 min ago",
    },
    lastMessage: "Thanks for the quick response!",
    unread: 3,
    messages: [
      {
        id: 1,
        sender: "customer",
        text: "Hi, I have a question about my order #12345",
        time: "10:30 AM",
        groupPosition: "first",
        status: "delivered",
        isNew:false,
      },
      // ... rest of the messages
    ],
  },
  // ... other conversations
];