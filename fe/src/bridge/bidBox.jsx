import React, { useState } from "react";
import { Button, Container, Row, Modal } from "react-bootstrap";
import UndoBid from "./undoBid";

const BidBox = ({
  placeBid,
  undoBid,
  goingBid,
  allowUndo,
  doubleOption,
  aiBid,
}) => {
  const [bid, setBid] = useState("");
  const styles = {
    fontFamily: ["Courier New"],
    fontSize: "large",
  };
  const onPickBid = (event, aiBid) => {
    const bid = event.target.value;
    console.log("onPickBid ", bid);
    if (bid === "Bid") return;
    if (aiBid && (bidReverseMap[bid] || bid) !== aiBid) {
      setBid(bid);
      return;
    } else {
      placeBid(bidReverseMap[bid] || bid);
      setBid("");
      return;
    }
  };
  const onPlaceBid = () => {
    placeBid(bidReverseMap[bid] || bid);
    setBid("");
  };

  const onRetryBid = () => {
    setBid("");
  };
  const onUndoBid = () => {
    undoBid();
    setBid("");
  };

  const bidReverseMap = {
    Pass: "P",
    "1NT": "1T",
    "2NT": "2T",
    "3NT": "3T",
    "4NT": "4T",
    "5NT": "5T",
    "6NT": "6T",
    "7NT": "7T",
    Dbl: "X",
    RDbl: "XX",
  };
  const bidMap = {
    "": "-",
    "1T": "1NT",
    "2T": "2NT",
    "3T": "3NT",
    "4T": "4NT",
    "5T": "5NT",
    "6T": "6NT",
    "7T": "7NT",
    X: "Dbl",
    XX: "RDbl",
  };

  const showConfirmPane = () => {
    return (
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Check your bid</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>Your bid: {bid}</Row>
          <Row> AI says: {bidMap[aiBid] || aiBid}</Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onRetryBid}>
            Retry
          </Button>
          <Button variant="primary" onClick={onPlaceBid}>
            Confirm Bid
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    );
  };
  const showBiddingButtons = () => {
    let options = ["Pass"];
    if (doubleOption) options.push(doubleOption);

    return (
      <Container style={styles}>
        <Row>
          {options.map((option, idx) => (
            <div key={idx} xs={3}>
              <Button
                key={option}
                onClick={(event) => onPickBid(event, aiBid)}
                className="btn-sm m-0 p-0"
                variant={option === "Pass" ? "success" : "danger"}
                value={option}
              >
                {option}
              </Button>
            </div>
          ))}
        </Row>
        {[1, 2, 3, 4, 5, 6, 7].map((level) => (
          <Row key={level}>
            {["C", "D", "H", "S", "T"].map((suit) => (
              <div key={suit}>
                {level + suit <= goingBid ? (
                  <Button
                    disabled
                    className="btn-sm m-0 p-0"
                    style={{ height: 12 }}
                    variant="dark"
                    value={level + suit}
                  >
                    {bidMap[level + suit] || level + suit}
                  </Button>
                ) : (
                  <Button
                    onClick={(event) => onPickBid(event, aiBid)}
                    className="btn-sm m-0 p-0"
                    variant="success"
                    value={level + suit}
                  >
                    {bidMap[level + suit] || level + suit}
                  </Button>
                )}
              </div>
            ))}
          </Row>
        ))}
      </Container>
    );
  };

  const showUndoOption = () => {
    return (
      <React.Fragment>
        {allowUndo && <UndoBid onUndoBid={onUndoBid} />}
      </React.Fragment>
    );
  };
  const showBiddingPane = () => {
    return (
      <React.Fragment>
        <div>{showBiddingButtons()}</div>
        <div>{showUndoOption()}</div>
      </React.Fragment>
    );
  };

  if (!bid) return showBiddingPane();
  return showConfirmPane();
};

export default BidBox;
