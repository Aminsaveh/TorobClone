import { AppRoutes } from "./AppRoutes"

export const HeaderItems = [
    {
        id: 1,
        title: "موبایل و تبلت",
        link: AppRoutes.home,
        subItemsCategory: [
            {
                title: "گوشی موبایل",
                link: AppRoutes.home,
                category: "Phone",
                subItems: [
                    { title: "گوشی سامسونگ", link: AppRoutes.home },
                    { title: "گوشی شیائومی", link: AppRoutes.home },
                    { title: "گوشی اپل", link: AppRoutes.home },
                ],
            },
            {
                title: "تبلت",
                link: AppRoutes.home,
                category: "Tablet",
                subItems: [
                    { title: "تبلت سامسونگ", link: AppRoutes.home },
                    { title: "تبلت شیائومی", link: AppRoutes.home },
                    { title: "تبلت اپل", link: AppRoutes.home },
                ],
            },
        ],
    },
    {
        id: 2,
        title: "لپتاپ",
        link: AppRoutes.home,
        subItemsCategory: [
            {
                title: "لپتاپ",
                link: AppRoutes.home,
                category: "Laptop",
                subItems: [
                    { title: "لپتاپ لنوو", link: AppRoutes.home },
                    { title: "لپتاپ ایسوس", link: AppRoutes.home },
                    { title: "لپتاپ اپل", link: AppRoutes.home },
                ],
            },
        ],
    },
]
