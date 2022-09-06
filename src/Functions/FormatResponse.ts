import ResponseDataIfase from '../Redux/interfaces/AdditionalInterfaces/ResponseDataIfase'

export default function FormatResponse(data: any, error: string | null): ResponseDataIfase {
  if (!!error) {
    return { data: null, error: error }
  } else {
    return { data: data, error: null }
  }
}