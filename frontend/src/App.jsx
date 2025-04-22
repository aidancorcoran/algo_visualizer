import React, { useState } from 'react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { FaListAlt, FaLink, FaTree, FaProjectDiagram, FaBars, FaGithub } from 'react-icons/fa';
import './App.css'

// Example data (you can expand this significantly)
const visualizerData = [
  {
    name: 'Array',
    icon: 'FaListAlt', // Example icon name from react-icons
    algorithms: [
      { name: 'Bubble Sort', id: 'array-bubble-sort' },
      { name: 'Selection Sort', id: 'array-selection-sort' },
      { name: 'Linear Search', id: 'array-linear-search' },
      { name: 'Binary Search (Sorted)', id: 'array-binary-search' },
    ],
  },
  {
    name: 'Linked List',
    icon: 'FaLink',
    algorithms: [
      { name: 'Traversal', id: 'linkedlist-traversal' },
      { name: 'Insertion', id: 'linkedlist-insertion' },
      { name: 'Deletion', id: 'linkedlist-deletion' },
    ],
  },
  {
    name: 'Tree',
    icon: 'FaTree',
    algorithms: [
        { name: 'BST Insertion', id: 'tree-bst-insertion'},
        { name: 'Depth First Search (DFS)', id: 'tree-dfs' },
        { name: 'Breadth First Search (BFS)', id: 'tree-bfs' },
    ],
  },
  {
    name: 'Graph',
    icon: 'FaProjectDiagram',
    algorithms: [
      { name: 'Depth First Search (DFS)', id: 'graph-dfs' },
      { name: 'Breadth First Search (BFS)', id: 'graph-bfs' },
      // { name: 'Dijkstra\'s Algorithm', id: 'graph-dijkstra' }, // Example for later
    ],
  },
  // Add more data structures (Stacks, Queues, Heaps, etc.)
];

function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);

  const handleAlgorithmSelect = (algo) => {
    console.log("Selected Algorithm:", algo);
    setSelectedAlgorithm(algo);
  };

  // Define styles using CSS Variables
  const sidebarBackgroundColor = 'var(--sidebar-bg)';
  const textColor = 'var(--text-light)';
  const hoverBackgroundColor = 'var(--primary-red)';
  const hoverTextColor = 'var(--text-light)'; // Keep text light on red hover
  const activeBackgroundColor = 'var(--primary-red)'; // Use red for active item background

  return (
    // Apply display:flex directly here ensures it covers the full height
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar
         collapsed={isCollapsed}
         backgroundColor={sidebarBackgroundColor} // Use variable for background
         style={{ height: '100vh', borderRight: '1px solid var(--primary-red)' }} // Use red border? or none? border: 'none'
         // width={isCollapsed ? '80px' : '250px'} // Example fixed widths
         // transitionDuration={300} // Smooth collapse transition
      >
        <Menu
          menuItemStyles={{
            button: ({ level, active, disabled, hover }) => {
              // Base styles
              let styles = {
                color: textColor,
                backgroundColor: sidebarBackgroundColor, // Ensure default bg matches sidebar
                border: 'none', // Remove default borders if any
              };
              // Hover styles
              if (hover && !active) {
                styles.backgroundColor = hoverBackgroundColor;
                styles.color = hoverTextColor;
              }
              // Active styles (when an item related to selectedAlgorithm is active)
              // Note: You might need more logic here to determine 'active' based on selectedAlgorithm.id
              // For now, let's assume react-pro-sidebar handles 'active' prop somehow or you set it manually
              if (active) {
                 styles.backgroundColor = activeBackgroundColor;
                 styles.fontWeight = 'bold'; // Make active item bold
              }
              // Styles for SubMenu expand/collapse icons
              if (level === 0) { // Target top-level items/submenus
                 styles.paddingLeft = '20px'; // Adjust padding as needed
              }
              return styles;
            },
            // Style the icons if needed
            icon: ({ active }) => ({
              color: active ? hoverTextColor : textColor, // Match icon color to text
              marginRight: '10px',
            }),
            // Style SubMenu expand icon color
            SubMenuExpandIcon: ({ open }) => ({
                color: textColor,
            }),
          }}
        >
          {/* Header / Toggle */}
          <MenuItem
            icon={<FaBars />}
            onClick={() => setIsCollapsed(!isCollapsed)}
            style={{ textAlign: "center", height: '50px', // Give it some height
                      display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            {/* Optionally show text only when not collapsed */}
             {!isCollapsed && <span style={{marginLeft: '10px', fontWeight: 'bold'}}>Algo Visualizer</span>}
          </MenuItem>

          {/* Divider */}
          {/* <div style={{height: '1px', backgroundColor: 'var(--primary-red)', margin: '10px 0'}} /> */}

          {visualizerData.map((ds) => (
            <SubMenu
              key={ds.name}
              label={ds.name}
              icon={ds.icon ? React.createElement(ds.icon) : null}
              // Apply active state if a child algorithm is selected
              // This requires more complex state tracking or checking children
            >
              {ds.algorithms.map((algo) => (
                <MenuItem
                  key={algo.id}
                  onClick={() => handleAlgorithmSelect(algo)}
                  // Set active prop based on selection
                  active={selectedAlgorithm?.id === algo.id}
                  style={{ paddingLeft: '30px' }} // Indent algorithm items
                >
                  {algo.name}
                </MenuItem>
              ))}
            </SubMenu>
          ))}

          {/* Footer Example */}
           <MenuItem
             icon={<FaGithub />}
             onClick={() => window.open("https://github.com/your-repo", "_blank")}
             style={{ marginTop: 'auto' }} // Pushes to bottom if Menu uses flex column
           >
             {!isCollapsed && <span style={{marginLeft: '10px'}}>View Source</span>}
           </MenuItem>
        </Menu>
      </Sidebar>

      {/* --- Main Content Area --- */}
      {/* Inherits background from body, text color should also be inherited */}
      <main style={{ padding: '20px', flexGrow: 1, overflowY: 'auto' }}>
         {/* You might remove this button if toggle is inside sidebar */}
         {/* <button onClick={() => setIsCollapsed(!isCollapsed)} style={{ marginBottom: '20px' }}>
             <FaBars />
         </button> */}

         <h1>Algorithm Visualization Area</h1>
         {selectedAlgorithm ? (
            <p>Selected: <strong style={{color: 'var(--primary-red)'}}>{selectedAlgorithm.name}</strong> ({selectedAlgorithm.id})</p>
         ) : (
            <p>Select an algorithm from the sidebar to begin.</p>
         )}

         {/* --- Your Visualization Component(s) will go here --- */}

      </main>
    </div>
  );
}

export default App;
