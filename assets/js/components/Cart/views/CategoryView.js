import React, { useState } from "react";
import { useUI } from "../../UI/UIContext";
import styled from 'styled-components'
import { useQuery } from "react-query";

const NavItem = styled.li`
    padding: 20px;
    font-weight: bold;
    font-size: 24px;
    a {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
`

const ActiveCategory = styled.div`
    .active-title{
        display: flex;
        background: #f5f4f4;
        padding: 20px;
        font-weight: bold;
        font-size: 24px;
        justify-content: space-between;
        align-items: center;
    }
    ul {
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 5px;
        li {
            font-size: 16px;
        }
    }
	header {
		padding: 20px;
		img  {
  width: 100%;
  height: auto;
  max-height: 40px;
		}
	}
`

const fetchCategories = () => {
    const token = window.__token__

    return fetch("/graphql", {
        method: "post",
        body: JSON.stringify({
            query: `
                query {
                    site {
                        categoryTree{
                            name
                            entityId
                            path
                            children{
                            name
                            entityId
                            path
                            children{
                                name
                                entityId
                                path
                                children {
                                    name
                                    entityId
                                    path
                                }
                            }
                            }
                        }
                    }
                }
            `
        }),
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .then(res => res.data.site.categoryTree)
}

const CategoryView = () => {
    const { data: categories } = useQuery("categories", fetchCategories)
    const [activeCategory, setActiveCategory] = useState(null)
    const { closeSidebar } = useUI()
    if (activeCategory) return (
        <nav data-sidenav="" data-sidenav-toggle="#sidenav-toggle">
            <header style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "flex-end"
                }}>
				
                    <button style={{
                        padding: "10px"
                    }} onClick={() => {
                        document.querySelector("body").classList.toggle("sidenav-no-scroll")
                        closeSidebar()
                   }}>
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                   </button>
					<div className="logo-wrap-nav"><img src="https://cdn11.bigcommerce.com/s-vnrl4jpszs/images/stencil/original/image-manager/header-logo.png" alt="MeddMax"/></div>
                </header>
            <ActiveCategory>
                        <div className="active-title">
                            <a href={activeCategory.path}>
                                {activeCategory.name}
                            </a>
                            <button style={{width: "40px", height: "40px"}} onClick={() => {
                                document.querySelector(".mobileMenu-toggle").classList.remove("is-open")
                                setActiveCategory(activeCategory.parent ?? null)
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                            </button>
							<div className="logo-wrap-nav"><img src="https://cdn11.bigcommerce.com/s-vnrl4jpszs/images/stencil/original/image-manager/header-logo.png" alt="MeddMax"/></div>
                        </div>
                        <ul>
                            {activeCategory?.children.map(
                                child => (
                                    <li key={child.entityId}>
                                        <a href={child.path} onClick={(e) => {
                                            if (child.children.length > 0) {
                                                e.preventDefault()
                                                setActiveCategory({...child, parent: activeCategory})
                                            }
                                        }}>
                                            <span>{child.name}</span>
                                            {child.children.length > 0 && (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                            )}
                                        </a>
                                    </li>
                                )
                            )}
                        </ul>
                    </ActiveCategory>
        </nav>
    )
    if (!activeCategory && categories) {
        return (
            <nav data-sidenav="" data-sidenav-toggle="#sidenav-toggle">
                   <header style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "flex-end"
                    }}>
                   
                        <button style={{
                            padding: "10px"
                        }} onClick={() => {
                            document.querySelector("body").classList.toggle("sidenav-no-scroll")
                            document.querySelector(".mobileMenu-toggle").classList.remove("is-open")
                            closeSidebar()
                       }}>
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                       </button>
					   <div className="logo-wrap-nav"><img src="https://cdn11.bigcommerce.com/s-vnrl4jpszs/images/stencil/original/image-manager/header-logo.png" alt="MeddMax"/></div>
                    </header>
                    <ul>
                        {categories.map(
                            category => (
                                <NavItem key={category.entityId}>
                                    <a href={category.path} onClick={(e) => {
                                        if (category.children.length > 0) {
                                            e.preventDefault()
                                            setActiveCategory(category)
                                        }
                                    }}>
                                        <span>{category.name}</span>
                                        {category.children.length > 0 && (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                          </svg>
                                        )}
                                    </a>
                                </NavItem>
                            )
                        )}
                    </ul>
                </nav>
        )
    }
    return null
}

export default CategoryView;
