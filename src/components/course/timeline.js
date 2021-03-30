import React from "react";
import { Steps, Button } from "antd";
const Step = Steps.Step;

const Timeline = ({ schedules, current, units, handleClick }) => {
  const searchItem = (idx) => {
    const unit = units.find((unit) => unit.week === idx + 1);
    if (units.length && unit) {
      if (unit.status === 1) return "finish";
      if (unit.status === 2) return "error";
    } else {
      if (idx + 1 === current) return "process";
      else return "wait";
    }
  };

  return (
    <Steps direction="vertical" current={current}>
      {schedules.map((item, idx) => (
        <Step
          key={item.title}
          status={searchItem(idx)}
          title={
            <Button onClick={() => handleClick(idx + 1)} type="link">
              {item.title}
            </Button>
          }
          description={<div>{item.description}</div>}
        />
      ))}
    </Steps>
  );
};

export default Timeline;
