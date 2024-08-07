import { settings } from "../../utils/constants";
import { ICatalog } from "../../types";

export const getCatalog = async () => {  /* Получение каталога */
  try {
    const catalog: ICatalog = await settings.api.get(`/product`);
    return catalog;
  }
  catch (err) {
    console.log(err)
  }
}