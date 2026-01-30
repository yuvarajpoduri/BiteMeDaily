module.exports = [
"[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/src/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/src/app/(dashboard)/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/(dashboard)/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/src/lib/data.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "mockedContent",
    ()=>mockedContent
]);
const today = new Date().toISOString().split('T')[0];
const mockedContent = [
    // --- NEWS (Today) ---
    {
        id: 'n1',
        category: 'News',
        title: 'SpaceX Starship Launches Again',
        description: 'Starship has successfully completed another test flight, landing the booster perfectly back at the launch tower. The Mechazilla arms caught it in mid-air.',
        source: 'SpaceNews',
        imageUrl: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=800&q=80',
        publishDate: today
    },
    {
        id: 'n2',
        category: 'News',
        title: 'Global Tech Hiring Stabilizes',
        description: 'After months of volatility, major tech companies report a stabilization in hiring for Q3, with AI roles still dominating the open positions.',
        source: 'TechCrunch',
        imageUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80',
        publishDate: today
    },
    // --- FACTS (Timeless) ---
    {
        id: 'f1',
        category: 'Facts',
        title: 'Honey Never Spoils',
        description: 'Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible. The key is low moisture and acidic pH!',
        source: 'National Geographic',
        imageUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80',
        publishDate: '2023-01-01'
    },
    // --- CS TOOLS ---
    {
        id: 'cs1',
        category: 'Computer Science Tools',
        title: 'VS Code: Ctrl + D',
        description: 'Stop manually selecting every instance of a word. Press Ctrl + D (Cmd + D on Mac) to select the next occurrence. Mash it to select them all!',
        source: 'VS Code Docs',
        imageUrl: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=800&q=80',
        publishDate: '2023-01-01'
    },
    {
        id: 'cs2',
        category: 'Computer Science Tools',
        title: 'Obsidian Canvas',
        description: 'Infinite canvas for your notes. visualize relationships between your markdown files, images, and web pages. It is like MS Paint for second brains.',
        source: 'Obsidian.md',
        imageUrl: 'https://images.unsplash.com/photo-1555421689-4922cd81a021?auto=format&fit=crop&w=800&q=80',
        publishDate: '2023-05-20'
    },
    // --- HISTORY (History Tab Content) ---
    {
        id: 'h1',
        category: 'History Stories',
        title: 'The Great Emu War',
        description: 'In 1932, Australia declared war on emus. The military used machine guns. The emus won using guerrilla tactics.',
        source: 'Australian War Memorial',
        imageUrl: 'https://images.unsplash.com/photo-1552560880-2482c3c1e30a?auto=format&fit=crop&w=800&q=80',
        historyMetadata: {
            century: '20th Century',
            region: 'Australia'
        }
    },
    {
        id: 'h2',
        category: 'History Stories',
        title: 'Cleopatra & The iPhone',
        description: 'Cleopatra lived closer in time to the invention of the iPhone than to the construction of the Great Pyramid of Giza.',
        source: 'History Channel',
        imageUrl: 'https://images.unsplash.com/photo-1548671783-690225d3df24?auto=format&fit=crop&w=800&q=80',
        historyMetadata: {
            century: '1st Century BC',
            region: 'Egypt'
        }
    },
    {
        id: 'h3',
        category: 'History Stories',
        title: 'The Dancing Plague',
        description: 'In 1518, a "dancing plague" struck Strasbourg, Alsace. Around 400 people took to dancing for days without rest and, over the period of about one month, some of those affected collapsed or even died of heart attack, stroke, or exhaustion.',
        source: 'History.com',
        imageUrl: 'https://images.unsplash.com/photo-1543589923-38cd650bbb4e?auto=format&fit=crop&w=800&q=80',
        historyMetadata: {
            century: '16th Century',
            region: 'Europe'
        }
    },
    {
        id: 'h4',
        category: 'History Stories',
        title: 'Samurai Fax Machine',
        description: 'The samurai caste in Japan was abolished in 1867. The first fax machine was patented in 1843. There was a 24-year window where a samurai could have theoretically sent a fax.',
        source: 'Smithsonian',
        imageUrl: 'https://images.unsplash.com/photo-1528360983277-13d9b152c611?auto=format&fit=crop&w=800&q=80',
        historyMetadata: {
            century: '19th Century',
            region: 'Japan'
        }
    },
    // --- COMPANIES ---
    {
        id: 'c1',
        category: 'Companies',
        title: 'Google\'s LEGO Server',
        description: 'Google’s first server storage was made of LEGO bricks to hold 10 4GB hard drives.',
        source: 'Stanford',
        imageUrl: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=800&q=80',
        publishDate: '2023-01-01'
    },
    // --- HEALTH ---
    {
        id: 'hl1',
        category: 'Health Suggestions',
        title: 'The 20-20-20 Rule',
        description: 'Every 20 minutes, look at something 20 feet away for 20 seconds to reduce eye strain.',
        source: 'AOA',
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
        publishDate: '2023-01-01'
    }
];
}),
"[project]/src/app/(dashboard)/history/HistoryClient.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/app/(dashboard)/history/HistoryClient.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/app/(dashboard)/history/HistoryClient.tsx <module evaluation>", "default");
}),
"[project]/src/app/(dashboard)/history/HistoryClient.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/app/(dashboard)/history/HistoryClient.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/app/(dashboard)/history/HistoryClient.tsx", "default");
}),
"[project]/src/app/(dashboard)/history/HistoryClient.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$dashboard$292f$history$2f$HistoryClient$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/app/(dashboard)/history/HistoryClient.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$dashboard$292f$history$2f$HistoryClient$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/src/app/(dashboard)/history/HistoryClient.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$dashboard$292f$history$2f$HistoryClient$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/src/app/(dashboard)/history/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HistoryPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/data.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$User$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/models/User.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$dashboard$292f$history$2f$HistoryClient$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(dashboard)/history/HistoryClient.tsx [app-rsc] (ecmascript)");
;
;
;
;
;
;
async function HistoryPage() {
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"])();
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user = session?.user?.email ? await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$User$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].findOne({
        email: session.user.email
    }) : null;
    const savedIds = user?.savedContentIds || [];
    const historyContent = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["mockedContent"].filter((c)=>c.category === 'History Stories');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "pt-4 pb-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "mb-2 px-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl font-bold text-accent-yellow mb-1",
                        children: "Time Machine"
                    }, void 0, false, {
                        fileName: "[project]/src/app/(dashboard)/history/page.tsx",
                        lineNumber: 19,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-400 text-sm",
                        children: "Where the past comes alive."
                    }, void 0, false, {
                        fileName: "[project]/src/app/(dashboard)/history/page.tsx",
                        lineNumber: 20,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(dashboard)/history/page.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$dashboard$292f$history$2f$HistoryClient$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                initialContent: historyContent,
                savedIds: savedIds
            }, void 0, false, {
                fileName: "[project]/src/app/(dashboard)/history/page.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(dashboard)/history/page.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/app/(dashboard)/history/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/(dashboard)/history/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__2bf76226._.js.map