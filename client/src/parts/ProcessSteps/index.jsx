import React, { Fragment } from "react";
import ProcessStepCard from "./ProcessStepCard";
import { Wrapper } from "./styles";

const desktopSteps = [
  {
    text: "Download your AltMe wallet and generate your account",
    img: "/assets/img/step-icon-1.png"
  },
  {
    text: "Request your Tezotopia voucher and get it in your AltMe wallet",
    img: "/assets/img/step-icon-2.png"
  },
  {
    text: "Make Tezotopia NFT purchases and your discount will be paid within 5 minutes",
    img: "/assets/img/step-icon-3.png"
  }
];

const ProcessSteps = ({ activeStep }) => {

  return (
    <Wrapper>
      {
        desktopSteps.map((item, index) => (
          <Fragment key={index}>
            <ProcessStepCard
              index={index + 1}
              text={item.text}
              img={item.img}
              isActive={activeStep && activeStep >= index + 1}
            />

            {
              (index !== desktopSteps.length - 1) && (
                <div className={`step-line ${(activeStep && activeStep >= index + 1) ? "active" : ""}`} />
              )
            }
          </Fragment>
        ))
      }
    </Wrapper>
  );
};

export default ProcessSteps;
