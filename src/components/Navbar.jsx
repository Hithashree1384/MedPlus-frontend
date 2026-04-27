import React from 'react'
import {navbarStyles} from "../assets/dummyStyles"
import { useState, useEffect, useRef } from "react";
import { SignedOut, useClerk, UserButton,SignedIn, SignOutButton } from "@clerk/clerk-react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import {Key, Menu, User, X} from "lucide-react"
import logo from "../assets/logo.jpeg"
const STORAGE_KEY = "doctorToken_v1";
const ADMIN_URL = import.meta.env.VITE_ADMIN_URL;
import { useUser } from "@clerk/clerk-react";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isDoctorLoggedIn, setIsDoctorLoggedIn] = useState(() => {
    try {
      return Boolean(localStorage.getItem(STORAGE_KEY));
    } catch {
      return false;
    }
  });
  const location = useLocation();
  const navRef = useRef(null);
  const clerk = useClerk();
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY) {
        setIsDoctorLoggedIn(Boolean(e.newValue));
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

    const navItems = [
    { label: "Home", href: "/" },
    { label: "Doctors", href: "/doctors" },
    { label: "Services", href: "/services" },
    { label: "Appointments", href: "/appointments" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
    <div className={navbarStyles.navbarBorder}></div>
    <nav ref={navRef} className={`${navbarStyles.navbarContainer} ${showNavbar ? navbarStyles.navbarVisible: navbarStyles.navbarHidden}`}>

    <div className={navbarStyles.contentWrapper}>
    <div className={navbarStyles.flexContainer}>
        <Link to='/' className={navbarStyles.logoLink}>
        <div className={navbarStyles.logoContainer}>
            <div className={navbarStyles.logoImageWrapper}>
                <img src={logo} alt="Logo" className={navbarStyles.logoImage} />
            </div></div>
            <div className={navbarStyles.logoTextContainer}>
                <h1 className={navbarStyles.logoTitle}>MedPlus</h1>
                <p className={navbarStyles.logoSubtitle}>Your Health, Our Priority</p>
            </div>
        

        </Link>
        <div className={navbarStyles.desktopNav}>
            <div className={navbarStyles.navItemsContainer}>
                {navItems.map((item) => {
                    const isActive = location.pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            to={item.href}
                            className={`${navbarStyles.navItem} ${isActive ? navbarStyles.navItemActive : navbarStyles.navItemInactive}`}
                        >
                            {item.label}
                        </Link>
                    );
                })}
            </div>
        </div>

        <div className={navbarStyles.rightContainer}><SignedOut>
            <Link to="/doctor-admin/login" className={navbarStyles.doctorAdminButton}>
                <User className={navbarStyles.doctorAdminIcon} />
                <spam className={navbarStyles.doctorAdminText}>Doctor Admin

                </spam>
                
            </Link>
            <button className={`${navbarStyles.doctorAdminButton} cursor-pointer`} onClick={() => window.open(ADMIN_URL, "_blank")}>
  Admin Panel
</button>
            <button onClick={()=> clerk.openSignIn()} className={navbarStyles.loginButton}>
               <Key className={navbarStyles.loginIcon} />
               <span className={navbarStyles.loginText}>Login</span>
            </button>
            
            </SignedOut>

            <SignedIn>
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      cursor: "pointer",
    }}
  >
    <UserButton
      afterSignOutUrl="/"
      appearance={{
        elements: {
          avatarBox: {
            width: "35px",
            height: "35px",
          },
        },
      }}
    />

    <span style={{ fontSize: "15px", fontWeight: "500",color:"teal" }}>
      Welcome, {user?.firstName}
    </span>
  </div>
</SignedIn>
            <button onClick={()=>setIsOpen(!isOpen)} className={navbarStyles.mobileToggle} >
                {isOpen ? (<X className={navbarStyles.toggleIcon} />):
                ( <Menu className={navbarStyles.toggleIcon} />)}
            </button>
        </div>
    </div>

    {isOpen && (
        <div className={navbarStyles.mobileMenu}>
            {navItems.map((item,idx) => {
                const isActive = location.pathname === item.href;
                return (
                    <Link
                        key={idx}
                        to={item.href}
                        onClick={()=>setIsOpen(false)}
                        className={`${navbarStyles.mobileMenuItem} ${isActive ? navbarStyles.mobileMenuItemActive : navbarStyles.mobileMenuItemInactive}`}
                    >
                        {item.label}
                    </Link>
                );
            })}
            <SignedOut>
                <Link to="/doctor-admin/login" className={navbarStyles.mobileDoctorAdminButton} onClick={()=>setIsOpen(false)}>
                    Doctor Admin
                </Link>
                <div className={navbarStyles.mobileLoginContainer}>
                    <button onClick={()=> {setIsOpen(false); clerk.openSignIn()}} className={navbarStyles.mobileLoginButton}>Login</button>
                </div>
            </SignedOut>
        </div>
    )}
    </div>

    <style>{navbarStyles.animationStyles}</style>
    </nav>
    
    </>

  )
}

export default Navbar
