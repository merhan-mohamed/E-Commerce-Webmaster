import React from "react";
import BlogSidebar from "@/components/layout/Blog/BlogSidebar";

const Layout=({ children }: { children: React.ReactNode })=> {
    return (
        <main className={'container grid grid-cols-6 gap-4 py-5 px-5'}>
            <section className={'blog-page-section col-span-4'}>
                {children}
            </section>
            <aside className={"col-span-2 px-6"}>
                <BlogSidebar />
            </aside>
        </main>
    );
}
export default Layout;
