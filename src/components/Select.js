import React from "react";
import { Box } from "@chakra-ui/core";
import { useSelector, useDispatch } from "react-redux";

export default function Select({
  useReps,
  useRpe,
  useWeights,
  useSets,
  usePercentages,
  customArray,
  ...restProps
}) {
  const units = useSelector(state => state.units);

  const repsArray = Array(12)
    .fill(null)
    .map((_, i) => ({ value: i + 1, text: i + 1 }));

  const rpeArray = [
    { value: 6.5, text: 6.5 },
    { value: 7, text: 7 },
    { value: 7.5, text: 7.5 },
    { value: 8, text: 8 },
    { value: 8.5, text: 8.5 },
    { value: 9, text: 9 },
    { value: 9.5, text: 9.5 },
    { value: 10, text: 10 }
  ];

  const setsArray = [
    { value: 1, text: 1 },
    { value: 2, text: 2 },
    { value: 3, text: 3 },
    { value: 4, text: 4 },
    { value: 5, text: 5 }
  ];

  function getPercentages() {
    return Array.from({ length: 200 }, (x, i) => {
      if (i + 1 > 9) {
        return { value: i + 1, text: i + 1 };
      }
      return null;
    }).filter(Boolean);
  }

  const percentagesArray = getPercentages();

  const getWeightsArray = () => {
    return Array.from({ length: 800 }, (_, i) => {
      if (i + 1 >= 100 && ((i + 1) % 10 === 5 || (i + 1) % 10 === 0)) {
        const text = units === "lbs" ? i + 1 : Math.round((i + 1) * 0.453592);
        return { value: i + 1, text: text };
      }
      return null;
    }).filter(Boolean);
  };

  const weightsArray = getWeightsArray();

  const items = useReps
    ? repsArray
    : useRpe
    ? rpeArray
    : useWeights
    ? weightsArray
    : useSets
    ? setsArray
    : customArray
    ? customArray
    : usePercentages
    ? percentagesArray
    : [];

  return (
    <Box
      {...restProps}
      color="gray.800"
      rounded="md"
      as="select"
      h="10"
      bg="gray.200"
      w="full"
      fontWeight="inherit"
      style={{ textAlignLast: "center" }}
    >
      {items.map(({ value, text }, i) => {
        return (
          <Box key={i} value={value} as="option" w="full">
            {text}
          </Box>
        );
      })}
    </Box>
  );
}
