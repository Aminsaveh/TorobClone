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
                    { title: "گوشی سامسونگ", brand: "Samsung", link: AppRoutes.home },
                    { title: "گوشی شیائومی", brand: "Xiaomi", link: AppRoutes.home },
                    { title: "گوشی اپل", brand: "Apple", link: AppRoutes.home },
                ],
            },
            {
                title: "تبلت",
                link: AppRoutes.home,
                category: "Tablet",
                subItems: [
                    { title: "تبلت سامسونگ", brand: "Samsung", link: AppRoutes.home },
                    { title: "تبلت شیائومی", brand: "Xiaomi", link: AppRoutes.home },
                    { title: "تبلت اپل", brand: "Apple", link: AppRoutes.home },
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
                    { title: "لپتاپ لنوو", brand: "Lenovo", link: AppRoutes.home },
                    { title: "لپتاپ ایسوس", brand: "Asus", link: AppRoutes.home },
                    { title: "لپتاپ اپل", brand: "Apple", link: AppRoutes.home },
                ],
            },
        ],
    },
]
