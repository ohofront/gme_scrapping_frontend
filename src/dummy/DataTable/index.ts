import { currencyFormatter } from "../../function/currencyFormatter";

export const headers = [
    {
      text: "Country",
      value: "name",
    },
    {
      text: "Competitors",
      value: "version",
    },
    {
      text: "Amount",
      value: "amount"
    }
  ];
  
  export type itemsType = {
    version: string;
    amount: number;
  }

  export const items= [
    {
      name: "India",
      version: "Wirebarley",
      amount: currencyFormatter(1581682000)
    },
    {
      name: "",
      version: "Sentbe",
      amount: currencyFormatter(1579751000)
    },
    {
        name: "",
        version: "E9pay",
        amount: currencyFormatter(1578009000)
    },
    {
        name: "",
        version: "GME",
        amount: currencyFormatter(1018176000)
    },
    {
        name: "",
        version: "Gmoney",
        amount: currencyFormatter(1574935000)
    },
    {
        name: currencyFormatter(1000000) + " INR",
        version: "",
        amount: ""
    },
    {
        name: "Philippines",
        version: "JRF",
        amount: currencyFormatter(1581682000)
      },
      {
        name: "",
        version: "Sentbe",
        amount: currencyFormatter(1579751000)
      },
      {
          name: "",
          version: "E9pay",
          amount: currencyFormatter(1578009000)
      },
      {
          name: "",
          version: "GME",
          amount: currencyFormatter(1018176000)
      },
      {
          name: "",
          version: "Gmoney",
          amount: currencyFormatter(1574935000)
      },
      {
        name: currencyFormatter(43000) + " PHP",
        version: "",
        amount: ""
      },
      {
        name: "Nepal",
        version: "JRF",
        amount: currencyFormatter(1581682000)
      },
      {
        name: "",
        version: "Sentbe",
        amount: currencyFormatter(1579751000)
      },
      {
          name: "",
          version: "E9pay",
          amount: currencyFormatter(1578009000)
      },
      {
          name: "",
          version: "GME",
          amount: currencyFormatter(1018176000)
      },
      {
          name: "",
          version: "Gmoney",
          amount: currencyFormatter(1574935000)
      },
      {
        name: currencyFormatter(100000) + " NPR",
        version: "",
        amount: ""
      },
      {
        name: "Srilanka",
        version: "JRF",
        amount: currencyFormatter(1581682000)
      },
      {
        name: "",
        version: "Sentbe",
        amount: currencyFormatter(1579751000)
      },
      {
          name: "",
          version: "E9pay",
          amount: currencyFormatter(1578009000)
      },
      {
          name: "",
          version: "GME",
          amount: currencyFormatter(1018176000)
      },
      {
          name: "",
          version: "Gmoney",
          amount: currencyFormatter(1574935000)
      },
      {
        name: currencyFormatter(280000)+ " LKR",
        version: "",
        amount: ""
      },
  ];
  
  export const feature = [
    " ১/ সর্বনিম্ন ৭মাস ভিসা থাকলেই জিএমই লোন নেয়া যায়। ৭মাস ভিসা থাকলে ৪ মাসের জন্য ২০ লাখ উন নেয়া যাবে।",
    "২/ জিএমই ফিন্যান্স এর নিজস্ব লোন তাই আবেদন করার ১-২ কর্মদিবস এর মধ্যে লোন রিলিজ করে দেয়া হয় (কাগজ পত্র সব ঠিক থাকলে)।",
    "৩/ আমরা সম্পূর্ণভাবে অনলাইনে লোনের আবেদন নিয়ে থাকি, তাই আমাদের ব্রাঞ্চ ভিজিট না করে ঘরে বসেই অনলাইনে লোন আবেদন করা যায় ।",
    "৪/ কোন গ্যারান্টর প্রয়োজন নেই। সহজ শর্ত ও ঝামেলা মুক্ত লোন।",
    "৫/ জিএমই অ্যাপস এর মাধ্যমে অবশিষ্ট লোনের পরিমান চেক করা যায়।",
    "৬/ জিএমই লোন শেষে যেকোনো সময় লোন ক্লিয়ারেন্স সার্টিফিকেট নেয়া যায় ।",
    "৭/ CMS এর মাধ্যমে প্রতি মাসের কিস্তি স্বয়ংক্রিয়ভাবে কেটে নেয়া হয়। ট্রান্সফার করে কিস্তি পরিশোধের কোন ঝামেলা নেই।",
    "৮/ কার্ডে ভিসা নেই কিন্ত পরবর্তীতে এক্সটেনশন করবেন এমন ভিসা দিয়ে লোন নেয়া যায় (E9,E7,F2,F4)। একমাত্র জিএমই এই সুবিধা দিয়ে থাকে।",
  ];
  