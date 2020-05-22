import '../styles/index.scss'

import * as gtag from '../lib/client/gtag'

import withEdgeTheme, {
  EdgeThemeContext,
} from '../lib/client/contexts/edge-theme'

import { EdgeUserProvider } from '../lib/client/contexts/edge-user'
import Router from 'next/router'
import { useContext } from 'react'

// Store navigation events on Google analytics
Router.events.on('routeChangeComplete', (url) => gtag.pageview(url))

function MyApp({ Component, pageProps }) {
  const { mode } = useContext(EdgeThemeContext)

  return (
    <>
    <div id="app-container" className={mode}>
      <EdgeUserProvider>
        <Component {...pageProps} />
      </EdgeUserProvider>
    </div>
    <style jsx global>{
      `
      
*,
*::before,
*::after {
  box-sizing: border-box;
}

* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'IBM Plex Sans', sans-serif;
  scroll-behavior: smooth;
}

// Global variables
:root {
  --empz-gap: 16pt;
  --empz-gap-negative: -16pt;
  --empz-gap-half: 8pt;
  --empz-gap-half-negative: -8pt;
  --empz-gap-quarter: 4pt;
  --empz-gap-quarter-negative: -4pt;
  --empz-gap-medium: 24pt;
  --empz-gap-medium-negative: -24pt;
  --empz-gap-double: 32pt;
  --empz-gap-double-negative: -32pt;
  --empz-page-margin: 16pt;
  --empz-page-width: 750pt;
  --empz-page-extra-width: 1024px;
  --empz-page-max-width: 1240px;
  --empz-page-width-with-margin: 782pt;
  --empz-breakpoint-mobile: 600px;
  --empz-breakpoint-tablet: 960px;
  --empz-radius: 4px;
  --empz-marketing-radius: 8px;
  --empz-cyan: #79ffe1;
  --empz-cyan-dark: #50e3c2;
  --empz-cyan-darker: #29bc9b;
  --empz-purple: #f81ce5;
  --empz-violet: #7928ca;
  --empz-alert: #ff0080;
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
    'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  --font-mono: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono,
    Bitstream Vera Sans Mono, Courier New, monospace;
  --header-height: 64px;
  --header-border-bottom: inset 0 -1px 0 0 rgba(0, 0, 0, 0.1);
  --header-background: hsla(0, 0%, 100%, 0.8);
  --empz-form-large-font: 1rem;
  --empz-form-large-height: 3rem;
  --empz-form-large-line-height: 1.5rem;
  --empz-form-small-font: 0.875rem;
  --empz-form-small-height: 2rem;
  --empz-form-small-line-height: 0.875rem;
  --empz-form-font: 0.875rem;
  --empz-form-height: 2.5rem;
  --empz-form-line-height: 1.25rem;
  --z-index-minimum: 1;
  --z-index-content: 2;
  --z-index-cover-content: 3;
  --z-index-header: 4;
  --z-index-toolbar: 5;
  --z-index-modal: 6;
  --z-index-maximum: 7;
}

// Theme variables
:root {
  --empz-foreground: #000;
  --empz-background: #fff;
  --empz-selection: var(--empz-cyan);
  --accents-1: #fafafa;
  --accents-2: #eaeaea;
  --accents-3: #999;
  --accents-4: #888;
  --accents-5: #666;
  --accents-6: #444;
  --accents-7: #333;
  --accents-8: #111;
  --empz-link-color: var(--empz-foreground);
  --empz-marketing-gray: #fafbfc;
  --empz-code: var(--empz-purple);
  --empz-success-light: #3291ff;
  --empz-success: #0070f3;
  --empz-success-dark: #0366d6;
  --empz-error-light: #ff1a1a;
  --empz-error: #e00;
  --empz-error-dark: #c00;
  --empz-warning-light: #f7b955;
  --empz-warning: #f5a623;
  --empz-warning-dark: #f49b0b;
  --empz-secondary-light: var(--accents-3);
  --empz-secondary: var(--accents-5);
  --empz-secondary-dark: var(--accents-7);
  --dropdown-box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.02);
  --dropdown-triangle-stroke: #fff;
  --scroller-start: #fff;
  --scroller-end: hsla(0, 0%, 100%, 0);
  --shadow-smallest: 0 2px 4px rgba(0, 0, 0, 0.05);
  --shadow-small: 0 5px 10px rgba(0, 0, 0, 0.12);
  --shadow-medium: 0 8px 30px rgba(0, 0, 0, 0.12);
  --shadow-large: 0 30px 60px rgba(0, 0, 0, 0.12);
  --shadow-hover: 0 30px 60px rgba(0, 0, 0, 0.12);
  --shadow-sticky: 0 12px 10px -10px rgba(0, 0, 0, 0.12);
  --portal-opacity: 0.25;
  --light-border-color: rgba(0, 0, 0, 0.2);
  --dark-border-color: rgba(255, 255, 255, 0.2);
  --light-border: 1px solid var(--light-border-color);
}

.dark-theme {
  --empz-foreground: #fff;
  --empz-background: #000;
  --empz-selection: var(--empz-purple);
  --accents-8: #fafafa;
  --accents-7: #eaeaea;
  --accents-6: #999;
  --accents-5: #888;
  --accents-4: #666;
  --accents-3: #444;
  --accents-2: #333;
  --accents-1: #111;
  --empz-success-light: #3291ff;
  --empz-success: #0070f3;
  --empz-success-dark: #0366d6;
  --empz-error-light: #f33;
  --empz-error: red;
  --empz-error-dark: #e60000;
  --empz-warning-light: #f7b955;
  --empz-warning: #f5a623;
  --empz-warning-dark: #f49b0b;
  --empz-secondary-light: var(--accents-3);
  --empz-secondary: var(--accents-5);
  --empz-secondary-dark: var(--accents-7);
  --empz-link-color: var(--empz-foreground);
  --empz-marketing-gray: var(--accents-1);
  --empz-code: var(--empz-cyan);
  --dropdown-box-shadow: 0 0 0 1px var(--accents-2);
  --dropdown-triangle-stroke: #333;
  --scroller-start: #000;
  --scroller-end: transparent;
  --header-background: rgba(0, 0, 0, 0.5);
  --header-border-bottom: inset 0 -1px 0 0 hsla(0, 0%, 100%, 0.1);
  --shadow-small: 0 0 0 1px var(--accents-2);
  --shadow-medium: 0 0 0 1px var(--accents-2);
  --shadow-large: 0 0 0 1px var(--accents-2);
  --shadow-sticky: 0 0 0 1px var(--accents-2);
  --shadow-hover: 0 0 0 1px var(--empz-foreground);
  --portal-opacity: 0.75;
  --light-border-color: rgba(255, 255, 255, 0.3);
  --light-border: 1px solid var(--light-border-color);
}

.robot-theme {
  --empz-foreground: #33cf33;
  --empz-background: #000;
  --empz-selection: var(--empz-purple);
  --accents-1: #082008;
  --accents-2: #0d360d;
  --accents-3: #124712;
  --accents-4: #165816;
  --accents-5: #1c721c;
  --accents-6: #1f7a1f;
  --accents-7: #269726;
  --accents-8: #2cbe2c;
  --empz-success-light: #3291ff;
  --empz-success: #0070f3;
  --empz-success-dark: #0366d6;
  --empz-error-light: #f33;
  --empz-error: red;
  --empz-error-dark: #e60000;
  --empz-warning-light: #f7b955;
  --empz-warning: #f5a623;
  --empz-warning-dark: #f49b0b;
  --empz-secondary-light: var(--accents-3);
  --empz-secondary: var(--accents-5);
  --empz-secondary-dark: var(--accents-7);
  --empz-link-color: var(--empz-foreground);
  --empz-marketing-gray: var(--accents-1);
  --empz-code: var(--empz-cyan);
  --dropdown-box-shadow: 0 0 0 1px var(--accents-2);
  --dropdown-triangle-stroke: #333;
  --scroller-start: #000;
  --scroller-end: transparent;
  --header-background: rgba(0, 0, 0, 0.5);
  --header-border-bottom: inset 0 -1px 0 0 hsla(0, 0%, 100%, 0.1);
  --shadow-small: 0 0 0 1px var(--accents-2);
  --shadow-medium: 0 0 0 1px var(--accents-2);
  --shadow-large: 0 0 0 1px var(--accents-2);
  --shadow-sticky: 0 0 0 1px var(--accents-2);
  --shadow-hover: 0 0 0 1px var(--empz-foreground);
  --portal-opacity: 0.75;
  --light-border-color: rgba(0, 255, 55, 0.3);
  --light-border: 1px solid var(--light-border-color);
}

.kawaii-theme {
  --empz-gap: 20pt;
  --empz-gap-negative: -20pt;
  --empz-gap-half: 8pt;
  --empz-gap-half-negative: -8pt;
  --empz-gap-quarter: 4pt;
  --empz-gap-quarter-negative: -4pt;
  --empz-gap-double: 32pt;
  --empz-gap-double-negative: -32pt;
  --empz-page-margin: 16pt;
  --empz-page-width: 750pt;
  --empz-page-max-width: 1024px;
  --empz-page-width-with-margin: 782pt;
  --empz-breakpoint-mobile: 600px;
  --empz-breakpoint-tablet: 960px;
  --empz-radius: 24px;

  --empz-foreground: white;
  --empz-background: #370e6d;
  --empz-selection: var(--empz-purple);
  --accents-8: #370e6d;
  --accents-7: #4b2480;
  --accents-6: #603797;
  --accents-5: #8559c0;
  --accents-4: #e7bfff;
  --accents-3: #ffc6ff;
  --accents-2: #ffceff;
  --accents-1: #ffd9ff;
  --empz-success-light: #3291ff;
  --empz-success: #0070f3;
  --empz-success-dark: #0366d6;
  --empz-error-light: #f33;
  --empz-error: red;
  --empz-error-dark: #e60000;
  --empz-warning-light: #f7b955;
  --empz-warning: #f5a623;
  --empz-warning-dark: #f49b0b;
  --empz-secondary-light: var(--accents-3);
  --empz-secondary: var(--accents-5);
  --empz-secondary-dark: var(--accents-7);
  --empz-link-color: var(--empz-foreground);
  --empz-marketing-gray: var(--accents-1);
  --empz-code: var(--empz-cyan);
  --dropdown-box-shadow: 0 0 0 1px var(--accents-2);
  --dropdown-triangle-stroke: #333;
  --scroller-start: #000;
  --scroller-end: transparent;
  --header-background: rgba(0, 0, 0, 0.5);
  --header-border-bottom: inset 0 -1px 0 0 hsla(0, 0%, 100%, 0.1);
  --shadow-small: 0 0 0 1px var(--accents-2);
  --shadow-medium: 0 0 0 1px var(--accents-2);
  --shadow-large: 0 0 0 1px var(--accents-2);
  --shadow-sticky: 0 0 0 1px var(--accents-2);
  --shadow-hover: 0 0 0 1px var(--empz-foreground);
  --portal-opacity: 0.75;
  --light-border-color: white;
  --light-border: 1px solid var(--light-border-color);
}

a{
  color: inherit;
}

#app-container {
  margin: 0;
  background-color: var(--empz-background);
  color: var(--empz-foreground);
}

main{
  min-height: calc(100vh - 332px);
}

.error-message{
  color: var(--empz-error);
  font-size: var(--empz-form-small-font);
  line-height: 2;
}

.success-message {
  color: var(--empz-success);
  font-size: var(--empz-form-small-font);
  line-height: 2;
}


// Generic fields styles
.input-group {
  margin-bottom: var(--empz-gap);
  position: relative;
  width: 100%;
}

.input-group label {
    display: block;
    font-size: var(--empz-form-large-font);
    font-weight: 500;
    padding-bottom: var(--empz-gap-half);
}
.input-group label::first-letter{
      text-transform: uppercase;
    
  }

  .input-group.required label:after {
        color: var(--empz-alert);
        content: '*';
        display: inline-block;
  }

  .input-group.error input,
  .input-group.error textarea,
  .input-group.error select {
      border-color: var(--empz-error);
    }
  

  .input-group.password {
    position: relative;
  }
  .input-group.password input{
      padding-right: 58px;
    }

.input-group.password svg{
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: var(--empz-gap);
      width: 22px;
}

.input-group.password svg   path{
    fill: var(--empz-foreground);
  }

.input-group.password svg.hide-password{
display: none;
margin-top: 1px;
}

.input-group.password .toggle-password{
cursor: pointer;
}

.input-group.password .toggle-password  &:hover svg.show-password {

  display: none;
}
.input-group.password .toggle-password  &:hover svg.hide-password{
  display: block;
}
      
    
  


input,
textarea,
select {
  background: var(--empz-background);
  border: var(--light-border);
  border-radius: var(--empz-radius);
  color: var(--empz-foreground);
  font-size: var(--empz-form-large-font);
  padding: var(--empz-gap);
  transition: 0.25s ease;
  width: 100%;
}

input:focus, input:hover,
textarea:focus, textarea:hover,
select:focus, select:hover {
  border-color: var(--empz-foreground);
    outline: none;
}

textarea {
  resize: vertical;
  min-height: 80px;
}

.input-select {
  position: relative;
}
.input-select:after {
    background: transparent;
    border-bottom: 2px solid var(--accents-5);
    border-right: 2px solid var(--accents-5);
    content: '';
    cursor: pointer;
    height: var(--empz-gap-half);
    position: absolute;
    pointer-events: none;
    right: var(--empz-gap);
    top: 50%;
    transform: translateY(-50%) rotate(45deg);
    transition: 0.25s ease;
    width: var(--empz-gap-half);
}

.input-radio-group{
  display: flex;
  flex-wrap: wrap;
}

.input-radio {
  display: inline-block;
  margin: var(--empz-gap);
  position: relative;
  width: 100%;
  flex: 1;
}

.input-radio:last-of-type{
    margin-right: 0;
  }

  .input-radio label {
    background: var(--empz-background);
    border: var(--light-border);
    border-radius: 4px;
    cursor: pointer;
    font-size: var(--empz-form-large-font);
    padding: var(--empz-gap);
    text-align: center;
    transition: 0.25s ease;
  }

  .input-radio input{
    left: 0;
    opacity: 0;
    position: absolute;
    top: 0;
  }

  .input-radio input:hover ~ label {
      
        border-color: var(--empz-foreground);
  }

  .input-radio input:hover:checked ~ labe {
      
        background: var(--empz-foreground);
        color: var(--empz-background);
      
    
  }


select {
  appearance: none;
  padding-right: var(--empz-gap-double);
  -webkit-appearance: none;
}

      `
}</style>
    </>

  )
}

export default withEdgeTheme(MyApp)
