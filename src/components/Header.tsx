"use client";

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import localFont from "next/font/local";

const epilogue = localFont({
  src: [
    {
      path: "../fonts/Epilogue-Variable.ttf",
      style: "normal",
    },
    {
      path: "../fonts/Epilogue-VariableItalic.ttf",
      style: "italic",
    },
  ],
  display: "swap",
});

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Foreword", href: "#foreword" },
  { label: "Facilities", href: "#features" },
  { label: "Admissions", href: "#admissions" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

interface HeaderProps {
  activeSection?: string;
}

const sectionColors: Record<string, { bg: string; text: string; altBg: string; altText: string }> = {
  home: { bg: "#3e4e3b", text: "white", altBg: "#e9e9e9", altText: "#3e4e3b" },
  foreword: { bg: "#e9e9e9", text: "#3e4e3b", altBg: "#3e4e3b", altText: "white" },
  features: { bg: "#e9e9e9", text: "#3e4e3b", altBg: "#3e4e3b", altText: "white" },
  achievements: { bg: "#e9e9e9", text: "#3e4e3b", altBg: "#3e4e3b", altText: "white" },
  admissions: { bg: "#e9e9e9", text: "#3e4e3b", altBg: "#3e4e3b", altText: "white" },
  gallery: { bg: "#3e4e3b", text: "white", altBg: "#e9e9e9", altText: "#3e4e3b" },
  testimonials: { bg: "#e9e9e9", text: "#3e4e3b", altBg: "#3e4e3b", altText: "white" },
  contact: { bg: "#e9e9e9", text: "#3e4e3b", altBg: "#3e4e3b", altText: "white" },
};

const Header: React.FC<HeaderProps> = ({ activeSection = "home" }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const current = sectionColors[activeSection] || sectionColors.home;
  const isHome = activeSection === "home";
  const isDarkSection = current.text === "white";
  const headerBgColor = isDarkSection 
    ? "rgba(62, 78, 59, 0.7)" 
    : "rgba(255, 255, 255, 0.7)";
  const textColor = current.text;
  const logoTextColor = current.text;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box
      sx={{
        width: 280,
        height: "100%",
        backgroundColor: "rgba(62, 78, 59, 0.98)",
        color: "white",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 1,
        }}
      >
        <IconButton onClick={handleDrawerToggle} sx={{ color: "white" }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              component="a"
              href={item.href}
              onClick={handleDrawerToggle}
              sx={{
                py: 2,
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              <ListItemText
                primary={item.label}
                sx={{
                  textAlign: "center",
                  "& .MuiTypography-root": {
                    fontWeight: 500,
                    fontSize: "1.1rem",
                    letterSpacing: "0.05em",
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: headerBgColor,
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: `1px solid ${isDarkSection ? 'rgba(255,255,255,0.1)' : 'rgba(62,78,59,0.08)'}`,
          boxShadow: "0 4px 24px rgba(0, 0, 0, 0.06)",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            px: { xs: 2, md: 4 },
            py: 1,
          }}
        >
          {/* Logo / School Name */}
          <Box
            component="a"
            href="/"
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              gap: 1.5,
            }}
          >
            <Image
              src="/vvvm_logo.jpg"
              alt="Vagdevi Vidya Mandir Logo"
              width={45}
              height={45}
              priority
            />
            <Typography
              className={epilogue.className}
              sx={{
                color: logoTextColor,
                fontSize: { xs: "1.8rem", md: "2rem" },
                letterSpacing: "0.05em",
                fontWeight: 900,
                transition: "color 0.3s ease",
              }}
            >
              VVM
            </Typography>
          </Box>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: "flex", gap: 1 }}>
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  href={item.href}
                  sx={{
                    color: textColor,
                    fontWeight: 500,
                    fontSize: "0.9rem",
                    letterSpacing: "0.05em",
                    px: 2,
                    py: 1,
                    borderRadius: "8px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: isDarkSection ? 'rgba(255,255,255,0.12)' : 'rgba(62,78,59,0.08)',
                      transform: "translateY(-1px)",
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ color: textColor, transition: "color 0.3s ease" }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 280,
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Header;
