import AuthIface from "./AdditionalInterfaces/AuthIface";
import BackendParamsIface from "./AdditionalInterfaces/BackendParamsIface";
import { MarketUser } from "./AdditionalInterfaces/MarketUser";
import MessageIface from "./AdditionalInterfaces/MessageIface";
import Pagination from "./AdditionalInterfaces/Pagination";
import Product from "./AdditionalInterfaces/Product";
import ProductCategory from "./AdditionalInterfaces/ProductCategory";

export interface FrontAppState {
  loading: boolean
  message: MessageIface
  backendParams: BackendParamsIface
  auth: AuthIface
}

export interface AppState {
  loading: boolean
  error: string
  tariff: string
  marketUser: MarketUser | null
  products: Product[]
  productCategories: ProductCategory[]
  pagination: Pagination
}

export interface ToastState {
  isActive: boolean
  message: string
  error: boolean
}

export interface ModalState {
  modalRequestForm: {
    isActive: boolean
  }
  mobileMenu: {
    isActive: boolean
  }
  modalWindow: {
    isActive: boolean
  }
}