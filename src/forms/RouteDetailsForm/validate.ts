import { IRouteDetailsFormValues } from "./types";

export const validate = (values: IRouteDetailsFormValues) => {
  const { points } = values;
  const pointErrors: {
    name?: string;
    timeArrival?: string;
    timeDeparture?: string;
  }[] = points.map((it) => ({
    name: undefined,
    timeArrival: undefined,
    timeDeparture: undefined,
  }));
  for (let i = 0; i < points.length; i += 1) {
    const currentPointArrival = points[i]?.timeArrival;
    const currentPointDeparture = points[i]?.timeDeparture;
    if (!points[i].name) {
      pointErrors[i].name = "Это обязательное поле.";
    }

    // Для первого и последнего эти правила не нужны
    if (i !== 0 && i !== points.length - 1) {
      // Проверка текущего времени отправления и прибытия
      if (currentPointArrival?.isAfter(currentPointDeparture)) {
        pointErrors[i].timeArrival =
          "Время прибытия не может быть позже чем время отбытия.";
      }
      if (currentPointDeparture?.isBefore(currentPointArrival)) {
        pointErrors[i].timeDeparture =
          "Время отбытия не может быть раньше чем время прибытия.";
      }
    }

    // Проверка предыдущих дат
    for (let j = Math.max(0, i - 1); j >= 0; j -= 1) {
      const previousPointArrival = points[j].timeArrival;
      const previousPointDeparture = points[j].timeDeparture;

      if (
        (i === 1 || j === 0
          ? false
          : currentPointArrival?.isBefore(previousPointArrival)) ||
        currentPointArrival?.isBefore(previousPointDeparture)
      ) {
        pointErrors[i].timeArrival =
          "Время прибытия не может быть раньше чем предыдущие отправления/прибытия.";
      }

      if (
        (i <= 1 || j === 0 || i === points.length - 1
          ? false
          : currentPointDeparture?.isBefore(previousPointArrival)) ||
        (i === points.length - 1
          ? false
          : currentPointDeparture?.isBefore(previousPointDeparture))
      ) {
        pointErrors[i].timeDeparture =
          "Время отбытия не может быть раньше чем предыдущие отправления/прибытия.";
      }
    }
  }
  return {
    name: Boolean(values.name) ? undefined : "Это обязательное поле",
    points: pointErrors,
  };
};
