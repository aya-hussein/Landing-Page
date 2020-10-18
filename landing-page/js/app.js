// To get all sections in document using querySelectorAll
const all_sections = document.querySelectorAll('section');

// Create DocumentFragment(virtual Div) to improve the performance
const myDocumentFragment = document.createDocumentFragment();

// making Loop to get each section in document to add new li in Nav bar with section's data_nav
all_sections.forEach(item => {
    // create new li element
    const listItem = document.createElement('li');
    // create new anchor element 
    const listItemLink = document.createElement('a');
    // get value of data_nav attribute to add it to anchor text
    const data_nav = item.getAttribute('data-nav');
    // create new text node with value of data_nav 
    var text = document.createTextNode(data_nav);
    //add text to anchor
    listItemLink.appendChild(text);
    // get value of id attribute to link between li and section
    const itemID = item.getAttribute('id');
    // add href attribute to link between list item and it's real section
    listItemLink.href = "#" + itemID;
    // add styling to each item in nav menu by adding new class called (menu__link)
    listItemLink.classList.add('menu__link');
    // add anchor to li
    listItem.appendChild(listItemLink);
    // add li to DocumentFragment
    myDocumentFragment.appendChild(listItem);
})// End for Loop

// After ending Loop get (ul) by it's id and add DocumentFragment to it  
const nav_menu = document.getElementById('navbar__list');
nav_menu.appendChild(myDocumentFragment);

// Get all links from nav menu by using getElementsByClassName
const allLinks = document.getElementsByClassName('menu__link');
// making for Loop to add event listener to each link in nav menu
for(const link of allLinks){
    link.addEventListener("click", e=>{
        // To stop default of click event to making scrollIntoView smoothly
        e.preventDefault();
        //get value of href attribute of each link to save it and scroll to it's section
        const hrefvalue = link.getAttribute("href");
        document.querySelector(hrefvalue).scrollIntoView({
            // scroll to section smoothly
            behavior: "smooth"
        });
        // making for Loop to remove class active_link from all links
        for(const l of allLinks){
            l.classList.remove('active_link');
        }// End for Loop

        // add class active_link only to link which is clicked
        link.classList.add('active_link');
    });
}// End for Loop

// get up_btn element to control of showing and hiding it and add event listener to it on click
const up_btn = document.getElementById('up_btn');
// adding event listener to up_btn
up_btn.addEventListener('click',()=>{
    // go to the top of document
    window.scrollTo(0,0);
})

/* declare variable to set it when no scrolling after 3 seconds it do function which hide
   the nav menu */
var stop_scroll;
// get nav menu to a variable to hide and show it
const nav_menu_bar = document.getElementById('page__header');
/* Add event listener to window when (scroll) to add class (your-active-class) to section which
   appears into view */
window.addEventListener('scroll', ()=>{
    window.clearTimeout(stop_scroll);
    // setting a variable 
    stop_scroll = setTimeout(()=>{
        // hide the nav menu
        nav_menu_bar.style.cssText='display:none';
    },3000);
    // show the nav menu
    nav_menu_bar.style.cssText='display:block';
    // save the value of top of window when scrolling in (scrollTop)
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    // check the value of top of window to show (up button) or not
    if(scrollTop >= 440){
        up_btn.style.cssText='display:block';
    }
    else{
        up_btn.style.cssText='display:none';
    }
    /* making Loop to check each section to add (your-active-class) to section which is viewed
       in window now */
    for(const section of all_sections){
        const data = section.getAttribute('data-nav');
        /* using getBoundingClientRect to determine the place of each section to know 
           which section is viewed in window now*/
        const rect_section = section.getBoundingClientRect();
        // -50 to ensure that section is viewed completely
        if(rect_section.top + scrollTop + section.offsetHeight -50> window.scrollY){
            // to remove (your-active-class) from all sections 
            for(const section of all_sections){
                section.classList.remove('your-active-class');
            }
            // and add (your-active-class) to section which is viewed in window
            section.classList.add('your-active-class');
            /* loop of all links in nav menu to check which link is linked with section
                is placed in view to add (active_link) class to this link*/
            for(const l of allLinks){
                if(l.innerHTML!==data){
                    l.classList.remove('active_link');
                }
                else{
                    l.classList.add('active_link');
                }
            }
            // stop (main for loop) when get first section only which pass from if check
            break;
        }// end if condition
    }// end main for loop
})// end scroll event listener of window