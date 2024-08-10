import React, { useState, useRef, useEffect } from "react";
import { Tree, TreeNode } from "react-organizational-chart";
import _ from "lodash";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import organization from "./org.json";
import img from "../img/images.png";
import "../Style/FlowChart.css";

// Styled components
const StyledCard = styled(Card)(({ bgcolor }) => {
  const screenWidth = window.screen.availWidth;
  // const screenHeight = window.screen.availHeight;

  let widthx;
  let heightx;
  if (screenWidth > 1800) {
    widthx = 150;
    heightx = 120;
  } else if (screenWidth > 1200 ) {
    widthx = 110;
    heightx = 100;
  } else if (screenWidth < 1300) {
    widthx = 120;
    heightx = 80;
  }

  return {
    display: "inline-block",
    borderRadius: 1,
    width: widthx,
    height: heightx,
    cursor: "pointer",
    opacity: 1,
    textAlign: "center",
    border: "none",
    boxShadow: "none",
    position: "relative",
    fontWeight:"600",
    fontSize:"13px",
    marginTop:"10px", 
  };
});

const StyledCardx = styled(Card)(({ bgcolor }) => {
  const screenWidth = window.screen.availWidth;

  let widthx;
  let heightx;
  if (screenWidth > 1800) {
    widthx = 145;
    heightx = 90;
  } else if (screenWidth > 1500) {
    widthx = 105;
    heightx = 70;
  } else if (screenWidth < 1300) {
    widthx = 120;
    heightx = 50;
  }
  let borderColor;
  if (bgcolor === "#ffd8d8") {
    borderColor = "#f77575";
  } else if (bgcolor === "#bccbf3") {
    borderColor = "#2d5dd9";
  } else if (bgcolor === "#d3d3d3") {
    borderColor = "#a9a9a9";
  } else {
    borderColor = "#f77575";
  }

  return {
    background: bgcolor || "#ffd8d8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 9,
    marginTop: "2px",
    width: widthx,
    height: heightx,
    cursor: "pointer",
    opacity: 1,
    textAlign: "center",
    border: `2px solid ${borderColor}`,
    boxShadow: "none",
    marginBottom: 0,
  };
});

const CrossButton = styled(Button)(({ theme }) => ({
  position: "absolute",
  top: "0px",
  right: "0%",
  minWidth: "0",
  width: "24px",
  height: "24px",
  borderRadius: "50%",
  padding: "0",
  color: "#fff",
  fontSize:"20px",
  background:"#ee5d50",
  
}));
const theme = createTheme({
  palette: {
    background: {
      default: "#ffffff00",
    },
  },
  typography: {
    padding: "0",
    marginTop: "0",
    fontFamily: "Roboto, sans-serif",
  },
  
});


// Node Components
function Organization({
  org,
  onClick,
  nodeColors,
  accessibleNodes,
  onDisableNode,
}) {
  const isAccessible = accessibleNodes.includes(org.id);
  const isDisabled = nodeColors[org.id] === "#d3d3d3";

  const handleDisable = (e) => {
    e.stopPropagation();
    onDisableNode(org);
  };

  const handleClick = () => {
    if (isAccessible && !isDisabled) {
      onClick(org);
    }
  };

  return (
    <StyledCard
      bgcolor={"green"}
      onClick={handleClick}
      style={{ cursor: isAccessible ? "pointer" : "not-allowed" }}
    >
      <StyledCardx
        bgcolor={nodeColors[org.id]}
        onClick={handleClick}
        style={{ cursor: isAccessible ? "pointer" : "not-allowed" }}
      >
        <img
          src={org.image}
          alt="org"
          style={{ width: "80%", height: "80%" }}
        />
      </StyledCardx>
      <Typography variant="p">{org.tradingName}</Typography>
      {org.tradingName !== "Event" &&
        org.tradingName !== "Venue" &&
        !isDisabled && <CrossButton onClick={handleDisable}>×</CrossButton>}
    </StyledCard>
  );
}

function Account({ a, onClick, nodeColors, accessibleNodes, onDisableNode }) {
  const isAccessible = accessibleNodes.includes(a.id);
  const isDisabled = nodeColors[a.id] === "#d3d3d3";

  const handleDisable = (e) => {
    e.stopPropagation();
    onDisableNode(a);
  };

  const handleClick = () => {
    if (isAccessible && !isDisabled) {
      onClick(a);
    }
  };

  return (
    <StyledCard
      style={{ cursor: isAccessible ? "pointer" : "not-allowed" }}
      bgcolor={"green"}
      onClick={handleClick}
    >
      <StyledCardx
        style={{ cursor: isAccessible ? "pointer" : "not-allowed" }}
        bgcolor={nodeColors[a.id]}
        onClick={handleClick}
      >
        <img
          src={a.image}
          alt={a.name}
          style={{ width: "80%", height: "80%" }}
        />
      </StyledCardx>
      <Typography variant="subtitle1" className="textcorrection">
        {a.name}
      </Typography>
      {a.name !== "Event" && a.name !== "Venue" && !isDisabled && (
        <CrossButton onClick={handleDisable}>×</CrossButton>
      )}
    </StyledCard>
  );
}

function Product({ p, onClick, nodeColors, accessibleNodes, onDisableNode }) {
  if (!p.name) return null;
  const isAccessible = accessibleNodes.includes(p.id);
  const isDisabled = nodeColors[p.id] === "#d3d3d3";

  const handleDisable = (e) => {
    e.stopPropagation();
    onDisableNode(p);
  };

  const handleClick = () => {
    if (isAccessible && !isDisabled) {
      onClick(p);
    }
  };

  return (
    <StyledCard
      onClick={handleClick}
      bgcolor={"green"}
      style={{ cursor: isAccessible ? "pointer" : "not-allowed" }}
    >
      {p.name === "Food" ? (
        <>
          <StyledCardx
            onClick={handleClick}
            bgcolor={nodeColors[p.id]}
            style={{ cursor: isAccessible ? "pointer" : "not-allowed" }}
          >
            <img src={img} alt="food" style={{ width: "80%", height: "80%" }} />
          </StyledCardx>
          <Typography variant="subtitle1">Special Food</Typography>
        </>
      ) : (
        <Typography variant="subtitle2">{p.name}</Typography>
      )}
      {p.name !== "Special Food" && !isDisabled && (
        <CrossButton onClick={handleDisable}>×</CrossButton>
      )}
    </StyledCard>
  );
}

function Node({
  o,
  parent,
  onNodeClick,
  nodeColors,
  accessibleNodes,
  onDisableNode,
}) {
  const T = parent
    ? TreeNode
    : (props) => (
        <Tree
          {...props}
          className="org-chart"
          lineWidth={"2px"}
          lineColor={"#bbc"}
          lineBorderRadius={"12px"}
          lineStyle={"dotted"}
          nodePadding={"10px"}
        >
          {props.children}
        </Tree>
      );

  return (
    <T
      label={
        o.tradingName === "Food" ? (
          <Product
            p={{ ...o, name: "Special Food" }}
            onClick={onNodeClick}
            nodeColors={nodeColors}
            accessibleNodes={accessibleNodes}
            onDisableNode={onDisableNode}
          />
        ) : (
          <Organization
            org={o}
            onClick={onNodeClick}
            nodeColors={nodeColors}
            accessibleNodes={accessibleNodes}
            onDisableNode={onDisableNode}
          />
        )
      }
    >
      {o.account.map((a, index) => (
        <TreeNode
          key={`account-${index}`}
          label={
            <Account
              a={a}
              onClick={onNodeClick}
              nodeColors={nodeColors}
              accessibleNodes={accessibleNodes}
              onDisableNode={onDisableNode}
            />
          }
        >
          {a.product.name && (
            <TreeNode
              key={`product-${index}`}
              label={
                <Product
                  p={a.product}
                  onClick={onNodeClick}
                  nodeColors={nodeColors}
                  accessibleNodes={accessibleNodes}
                  onDisableNode={onDisableNode}
                />
              }
            />
          )}
        </TreeNode>
      ))}
      {_.map(o.organizationChildRelationship, (c, index) => (
        <Node
          key={`child-${index}`}
          o={c}
          parent={o}
          onNodeClick={onNodeClick}
          nodeColors={nodeColors}
          accessibleNodes={accessibleNodes}
          onDisableNode={onDisableNode}
        />
      ))}
    </T>
  );
}

function FlowChart({ onDialogStateChange }) {
  const boxRef = useRef(null);

  const [back, setback] = useState(false);
  const [open, setOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);
  const [confirmationNode, setConfirmationNode] = useState(null);
  const [nodeColors, setNodeColors] = useState({ "event-1": "#ffd8d8" });
  const [accessibleNodes, setAccessibleNodes] = useState(["event-1"]);
  const [disabledNodes, setDisabledNodes] = useState(new Set());
  const [datax, setdatax] = useState("");

  function handleform(e) {
    setdatax(e.target.value);
  }

  const handleClickOpen = (node) => {
    setSelectedNode(node);
    setOpen(true);
    onDialogStateChange(true);
  };


  const cheaplogic=()=>{
    location.reload();
  }
  const handleClose = () => {
    setback(false)
    setOpen(false);
    setSelectedNode(null);
    onDialogStateChange(false);
  };

  const handleConfirmationOpen = (node) => {
    setConfirmationNode(node);
    setConfirmationOpen(true);
  };

  const handleConfirmationClose = () => {
    setConfirmationOpen(false);
    setConfirmationNode(null);
  };

  const handleConfirmDisable = () => {
    if (confirmationNode) {
      handleDisableNode(confirmationNode);
      handleConfirmationClose();
    }
  };

  const handleChangeColor = () => {
    if (selectedNode && selectedNode.id) {
      const newNodeColors = { ...nodeColors, [selectedNode.id]: "#bccbf3" }; // Change color to blue
      let newAccessibleNodes = new Set(accessibleNodes);

      const makeAccessible = (node) => {
        newAccessibleNodes.add(node.id);
        node.account?.forEach((a) => newAccessibleNodes.add(a.id));
        node.account?.forEach(
          (a) => a.product && newAccessibleNodes.add(a.product.id)
        );
        node.organizationChildRelationship?.forEach((c) =>
          newAccessibleNodes.add(c.id)
        );
      };

      makeAccessible(selectedNode);

      if (selectedNode.parent) {
        selectedNode.parent.organizationChildRelationship?.forEach(
          (sibling) => {
            if (sibling.id !== selectedNode.id) {
              newAccessibleNodes.add(sibling.id);
            }
          }
        );
      }

      if (Object.values(newNodeColors).includes("#bccbf3")) {
        organization.organizationChildRelationship.forEach((c) => {
          newAccessibleNodes.add(c.id);
        });
      }

      setNodeColors(newNodeColors);
      setAccessibleNodes([...newAccessibleNodes]);
      handleClose();
    }
  };

  const handleDisableNode = (node) => {
    const newNodeColors = { ...nodeColors };
    const newDisabledNodes = new Set(disabledNodes);

    const disableRecursively = (node) => {
      newNodeColors[node.id] = "#d3d3d3"; // Change color to grey
      newDisabledNodes.add(node.id);
      node.account?.forEach((a) => {
        newNodeColors[a.id] = "#d3d3d3";
        newDisabledNodes.add(a.id);
        if (a.product) {
          newNodeColors[a.product.id] = "#d3d3d3";
          newDisabledNodes.add(a.product.id);
        }
      });
      node.organizationChildRelationship?.forEach((c) => {
        newNodeColors[c.id] = "#d3d3d3";
        newDisabledNodes.add(c.id);
        disableRecursively(c);
      });
    };

    disableRecursively(node);
    setNodeColors(newNodeColors);
    setDisabledNodes(newDisabledNodes);
  };

  const getDialogContent = (node) => {
    if (!node) return null;
    switch (node.tradingName || node.name) {
      case "Event":
        return (
          <div className="smplw">
            <Typography variant="body1">
              This is an Event node. You  change its color or disable it.
              <input type="text" value={datax} onChange={handleform} />
            </Typography>
          </div>
        );
      case "Venue":
        return (
          <Typography variant="body1">
            This is a Venue node. Specific details about the venue go here.
          </Typography>
        );
      default:
        return (
          <Typography variant="body1">
            This is a generic node. You can perform actions on it.
          </Typography>
        );
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        ref={boxRef}
        bgcolor="background.default"
        padding={0}
        className={`boxcarrier ${open ? "box-hidden" : ""}`} // Conditional class for visibility
        height="95%"
        width="80%"
      >
        <Node
          o={organization}
          onNodeClick={handleClickOpen}
          nodeColors={nodeColors}
          accessibleNodes={accessibleNodes}
          onDisableNode={handleConfirmationOpen} // Updated here
        />

        {/* Main Dialog */}
        <Dialog
          open={open}
          onClose={handleClose}
          fullWidth

          PaperProps={{
            style: {
              position: "absolute",
              top: "50.2%",
              left: "55.6%",
              transform: "translate(-50%, -50%)",
              width: "auto",
              // width: '81.6%',
              maxWidth: "none",
              // height: '83.3%',
              borderRadius: "8px",
              backgroundColor: "white",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
            },
          }}
        >
          <DialogTitle>Node Information</DialogTitle>
          <form action="">
            <input type="text" value={datax} onChange={handleform} />
          </form>
          <DialogContent dividers>
            {getDialogContent(selectedNode)}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} >
              Cancel
            </Button>
            <Button onClick={handleChangeColor} color="primary">
              Change Color
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={back}
          onClose={handleClose}
          fullWidth
          PaperProps={{
            style: {
              width: "400px", // Adjust width as needed
              height: "200px", // Adjust height as needed
              maxWidth: "none",
            },
          }}
        >

<h3>by this action the progress will loss</h3>

<Button onClick={handleClose} color="primary">
              Cancel
            </Button>
<Button onClick={cheaplogic} color="primary">
              Confirm
            </Button>


        </Dialog>

        {/* Confirmation Dialog */}
        <Dialog
          open={confirmationOpen}
          onClose={handleConfirmationClose}
          fullWidth
          PaperProps={{
            style: {
              width: "400px", // Adjust width as needed
              height: "200px", // Adjust height as needed
              maxWidth: "none",
            },
          }}
        >
          <DialogTitle>Confirm Disable Node</DialogTitle>
          <DialogContent dividers>
            <Typography variant="body1">
              Are you sure you want to disable the following node and its
              children?
            </Typography>
            <Typography variant="body2" style={{ marginTop: "10px" }}>
              Node: {confirmationNode?.tradingName || confirmationNode?.name}
            </Typography>
            <Typography variant="body2">
              Children:{" "}
              {confirmationNode?.account?.map((a) => a.name).join(", ")}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleConfirmationClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleConfirmDisable} color="primary">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>

        <div className="treebuttons">
          <Button color="primary" className="dex">
            Cancel
          </Button>
          <Button color="primary" className="dex">
            Cancel
          </Button>
          <Button color="primary" onClick={setback}  className="dex">
            Cancel
          </Button>
        </div>
      </Box>
    </ThemeProvider>
  );
}

export default FlowChart;

// hardworkbranch