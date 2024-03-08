import { Field, Form } from "react-final-form";
import { IRouteDetailsFormValues } from "./types";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Stack,
  Typography,
  TextField as MUITextField,
} from "@mui/material";
import { FieldArray } from "react-final-form-arrays";
import { DateTimePicker, renderTimeViewClock } from "@mui/x-date-pickers";
import arrayMutators from "final-form-arrays";
import moment from "moment";
import { validate } from "./validate";

export interface IRouteDetailsFormProps {
  initialValues: IRouteDetailsFormValues;
  onSubmit: (values: IRouteDetailsFormValues) => any;
}

export const RouteDetailsForm: React.FC<IRouteDetailsFormProps> = ({
  onSubmit,
  initialValues,
}) => {
  return (
    <Form
      onSubmit={onSubmit}
      mutators={{
        ...arrayMutators,
      }}
      initialValues={initialValues}
      validate={validate}
      render={({
        form: {
          mutators: { push },
        },
        handleSubmit,
        invalid,
        pristine,
      }) => (
        <Box
          sx={{
            width: "100%",
            marginBottom: "16px",
          }}
          component="form"
        >
          {/* Route Name */}
          <Typography variant="body1" sx={{ marginBottom: 1 }}>
            Название маршрута
          </Typography>
          <Box
            sx={{
              bgcolor: "background.paper",
              padding: 2,
              borderRadius: "4px",
              marginBottom: 2,
            }}
          >
            <Field
              name="name"
              render={({ input: { value, onChange }, meta }) => (
                <MUITextField
                  placeholder="Москва - Сочи"
                  value={value}
                  required
                  fullWidth
                  onChange={onChange}
                  error={Boolean(meta.error)}
                  helperText={meta.error}
                />
              )}
            />
          </Box>

          {/* Route Points */}
          <Typography variant="body1" sx={{ marginBottom: 1 }}>
            Пункты маршрута
          </Typography>
          <Stack gap={3} sx={{ marginBottom: 3 }}>
            <FieldArray name="points">
              {({ fields }) =>
                fields.map((name, index) => (
                  <Stack
                    key={index}
                    flexDirection="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    sx={{
                      bgcolor: "background.paper",
                      padding: 2,
                      gap: 2,
                      borderRadius: "4px",
                    }}
                  >
                    <FormControl
                      sx={{
                        width: "100%",
                        marginBottom: 0.5,
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      <FormLabel sx={{ flex: 1 }}>Пункт #{index + 1}</FormLabel>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => fields.remove(index)}
                      >
                        Удалить
                      </Button>
                    </FormControl>
                    <Field
                      name={`${name}.name`}
                      render={({ input: { value, onChange }, meta }) => (
                        <MUITextField
                          placeholder="Название пункта маршрута"
                          value={value}
                          fullWidth
                          onChange={onChange}
                          error={Boolean(meta.error)}
                          helperText={meta.error}
                        />
                      )}
                    />

                    {index !== 0 && (
                      <Field
                        name={`${name}.timeArrival`}
                        render={({ input: { value, onChange }, meta }) => (
                          <DateTimePicker
                            ampm={false}
                            value={value}
                            onChange={onChange}
                            label="Время прибытия"
                            viewRenderers={{
                              hours: renderTimeViewClock,
                              minutes: renderTimeViewClock,
                            }}
                            slotProps={{
                              textField: {
                                fullWidth: true,
                                error: Boolean(meta.error),
                                helperText: meta.error,
                              },
                            }}
                          />
                        )}
                      />
                    )}
                    {index !== (fields?.length as any) - 1 && (
                      <Field
                        name={`${name}.timeDeparture`}
                        render={({ input: { value, onChange }, meta }) => (
                          <DateTimePicker
                            ampm={false}
                            value={value}
                            onChange={onChange}
                            label="Время отправления"
                            viewRenderers={{
                              hours: renderTimeViewClock,
                              minutes: renderTimeViewClock,
                            }}
                            slotProps={{
                              textField: {
                                fullWidth: true,
                                error: Boolean(meta.error),
                                helperText: meta.error,
                              },
                            }}
                          />
                        )}
                      />
                    )}
                  </Stack>
                ))
              }
            </FieldArray>
          </Stack>

          <Button
            variant="contained"
            fullWidth
            onClick={() =>
              push("points", {
                name: "",
                timeArrival: moment(),
                timeDeparture: moment(),
              })
            }
          >
            Добавить новый пункт маршрута
          </Button>

          <Button
            variant="contained"
            color="success"
            fullWidth
            onClick={handleSubmit}
            sx={{ marginTop: 5 }}
            disabled={pristine || invalid}
          >
            Сохранить
          </Button>
        </Box>
      )}
    />
  );
};

export default RouteDetailsForm;
