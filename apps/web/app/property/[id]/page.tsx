import { PropertyDetailPage } from "@/components/PropertyDetailPage"

type PropertyPageProps = {
  params: {
    id: string
  }
}

const PropertyPage = ({ params }: PropertyPageProps) => {
  return <PropertyDetailPage propertyId={params.id} />
}

export default PropertyPage
