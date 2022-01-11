import React, { useState, useEffect } from 'react';
import { NavLink, withRouter } from "react-router-dom";

const CTA_KEYS = {
  NEXT: 'next',
  PREV: 'prev'
}

function NavigationControls({views, navDisabled}) {
    const [index, setIndex] = useState(0);
    const [disabledData, setDisabledData] = useState({
      'prev': false,
      'next': false,
    });
    const windowPathname = window.location.pathname;

    useEffect(() => {
      const currentIdx = 
        views.map((elem) => elem.pathname === windowPathname).indexOf(true);

      setIndex(currentIdx);
    }, [views,  windowPathname]);

    useEffect(() => {
      const viewsLengthIdx = views.length - 1;

      if (navDisabled) {
        setDisabledData({
          prev: true,
          next: true
        });

        return;
      }

      switch (index) {
        case 0:
          setDisabledData({
            prev: true,
            next: false
          });
          break;
        case viewsLengthIdx:
          setDisabledData({
            prev: false,
            next: true,
          });
          break;
        default:
        setDisabledData({
          prev: false,
          next: false
        });
      }

    }, [index, views, navDisabled]);

    const navLinkHandler = (ctaKey) => {
      if (ctaKey === CTA_KEYS.PREV) {
        setIndex(index - 1);
      }

      if (ctaKey === CTA_KEYS.NEXT) {
        setIndex(index + 1);
      }
    }

    const getPathname = (ctaKey) => {
      if (ctaKey === CTA_KEYS.PREV && views[index - 1]) {
        return views[index - 1].pathname;
      }

      if (ctaKey === CTA_KEYS.NEXT && views[index + 1]) {
        return views[index + 1]?.pathname
      }

      return "/";
    }

    const setDisabledClassName = (ctaKey) => {
      return disabledData[ctaKey] ? "disabled" : "";
    }

    return (
      <>
      { index > -1 &&
        <nav className="nav-container">
          <NavLink 
          className={setDisabledClassName(CTA_KEYS.PREV)} 
          onClick={() => navLinkHandler(CTA_KEYS.PREV)} 
          to={getPathname(CTA_KEYS.PREV)}>
            Prev
          </NavLink>

          <NavLink 
          className={setDisabledClassName(CTA_KEYS.NEXT)} 
          onClick={() => navLinkHandler(CTA_KEYS.NEXT)} 
          to={getPathname(CTA_KEYS.NEXT)}>
            Next
          </NavLink>
        </nav>
      }
      </>
    );
}

export default withRouter(NavigationControls);
