/* eslint-disable max-lines */
import { Option, OptionNull } from "@/types/option";
import { OptionValue } from "@/types/option-value";
import { ProductSkuCreateInput } from "@/types/product-sku";
import combineProduct from "@/utils/combine-product";
import { Add } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  Typography,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import OptionCreate from "../product-detail/create/OptionCreate";
import FormDetail from "./FormDetail";
type Props = {
  handleNext: (data?: ProductSkuCreateInput[]) => void;
};
const initialCat = {
  optionSku: null,
  optionValues: [],
};

const initialDetail: ProductSkuCreateInput = {
  product: "",
  price: 0,
  priceDiscount: 0,
  percent: 0,
  quantitySold: 0,
  quantityInStock: 0,
  numberSKU: "",
  content: "",
  photos: [],
  optionValues: [],
};
type listFile = {
  files: File[];
};

export default function CreateDetail({ handleNext }: Props) {
  const [appendList, setAppendList] = useState<OptionNull[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<listFile[]>([]);
  const [dataCombine, setDataCombine] = useState<any[]>([]);
  const [checkedItems, setCheckedItems] = useState<boolean[]>(
    Array(dataCombine.length).fill(false),
  );
  const [details, setDetails] = useState<ProductSkuCreateInput[]>([]);
  //   const [skuValues, setSkuValues] = useState<SkuValue[]>([]);

  const handleCheckboxChange = (index: number) => {
    setCheckedItems((prev) => {
      const updatedCheckedItems = [...prev];
      updatedCheckedItems[index] = !prev[index];
      handleCheckedValues(updatedCheckedItems);
      return updatedCheckedItems;
    });
  };
  const handleCheckedValues = (checkedValues: boolean[]) => {
    if (details && details.length) {
      const updateDate = [...details];
      const updatedSelectedItems = dataCombine.map((item, i) =>
        checkedValues[i]
          ? {
              ...(updateDate[i] ? updateDate[i] : initialDetail),
              optionValues: item.map((item1) => item1._id) || [],
            }
          : initialDetail,
      );
      setDetails(updatedSelectedItems);
    } else {
      const updatedSelectedItems = dataCombine.map((item, i) =>
        checkedValues[i]
          ? { ...initialDetail, optionValues: item.map((item1) => item1._id) || [] }
          : initialDetail,
      );
      setDetails(updatedSelectedItems);
    }
  };

  const handleInputChange = (
    value: Option | OptionValue[],
    name: string,
    index: number,
  ) => {
    if (appendList) {
      const updatedData = [...appendList];
      updatedData[index] = { ...updatedData[index], [name]: value };

      setAppendList(updatedData);
    }
  };

  const handleRemoveOption = (val: number) => {
    if (appendList) {
      const removeData = appendList.filter((_, index) => index !== val);
      setAppendList(removeData);
    }
  };

  const handleAddCol = () => {
    if (appendList) {
      setAppendList([...appendList, initialCat]);
    }
  };
  const handleMerge = (data: OptionNull[]) => {
    setDataCombine(combineProduct(data));
  };
  const handleDetailChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
  ) => {
    const target = e.target as HTMLInputElement;
    if (details) {
      const updatedData = [...details];
      updatedData[index] = {
        ...updatedData[index],
        [target.name]: target.value,
      };
      if (target.files) {
        const newFiles = Array.from(target.files || []);
        const validFiles = newFiles.filter((file) => file.type.startsWith("image/"));

        const updateFiles = [...selectedFiles];
        updateFiles[index] = {
          ...updateFiles[index],
          files: validFiles,
        };
        setSelectedFiles(updateFiles);
        updatedData[index] = {
          ...updatedData[index],
          [target.name]: updateFiles[index].files,
        };
      }
      setDetails(updatedData);
    }
  };

  const handleFileRemove = (i: number, index: number) => {
    if (details) {
      const updatedData = [...details];
      updatedData[index] = {
        ...updatedData[index],
        photos: updatedData[index].photos.filter((_, index) => index !== i),
      };
      const updatedFile = [...selectedFiles];
      updatedFile[index] = {
        ...updatedFile[index],
        files: updatedFile[index].files.filter((_, index) => index !== i),
      };
      setSelectedFiles(updatedFile);
      setDetails(updatedData);
    }
  };

  return (
    <>
      <Card sx={{ borderRadius: "10px" }}>
        <CardHeader
          title="Variants"
          titleTypographyProps={{
            variant: "body1",
            fontWeight: "600",
            textTransform: "capitalize",
            ml: 3,
          }}
          style={{
            background: "#F8F8F8",
          }}
        />
        <Divider sx={{ margin: 0 }} />
        <CardContent sx={{ paddingX: 5, paddingY: 3 }}>
          <Grid container>
            {!!appendList &&
              !!appendList.length &&
              appendList.map((val, i) => {
                return (
                  <OptionCreate
                    key={i}
                    index={i}
                    handleInputChange={handleInputChange}
                    handleRemoveOption={handleRemoveOption}
                    data={val}
                  />
                );
              })}

            <Grid
              item
              xs={12}
              textAlign={"start"}
              mb={4}
            >
              <Button
                startIcon={<Add />}
                variant="outlined"
                type="button"
                onClick={handleAddCol}
                className="btn-action"
                size="small"
              >
                Add Variant
              </Button>
            </Grid>
            <Grid
              item
              xs={12}
              mb={2}
            >
              {!!appendList && !!appendList.length && (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography
                    fontWeight="bold"
                    variant="body1"
                  >
                    Create details
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => handleMerge(appendList)}
                  >
                    Mixed variant
                  </Button>
                </Box>
              )}
            </Grid>
            <Grid
              item
              xs={12}
              mb={4}
            >
              <FormGroup>
                {dataCombine.map((item, index) => (
                  <FormControlLabel
                    key={index}
                    value={item}
                    control={
                      <Checkbox
                        checked={checkedItems[index]}
                        onChange={() => handleCheckboxChange(index)}
                      />
                    }
                    label={item.map((value, i) => (
                      <Typography
                        variant="body1"
                        color="black"
                        display={"inline-flex"}
                        sx={{ mr: 1 }}
                        key={i}
                      >
                        {value.name}
                        {i !== item.length - 1 && " /"}
                      </Typography>
                    ))}
                  />
                ))}
              </FormGroup>
            </Grid>
            {!!details &&
              !!details.length &&
              details.map((item, index) => {
                return (
                  !!item.optionValues.length && (
                    <>
                      <Grid
                        item
                        xs={12}
                        key={index}
                        mb={4}
                      >
                        <FormDetail
                          index={index}
                          item={item}
                          handleDetailChange={handleDetailChange}
                          handleFileRemove={handleFileRemove}
                        />
                      </Grid>
                    </>
                  )
                );
              })}
          </Grid>
        </CardContent>
      </Card>
      <Box
        textAlign={"end"}
        my={4}
      >
        <Button
          variant="contained"
          className="btn-action"
          onClick={() => handleNext(details)}
          sx={{ width: "100px" }}
        >
          Finish
        </Button>
      </Box>
    </>
  );
}
