import React from "react";
import { useParams } from "react-router-dom";
import PropertyDetail from "../components/PropertyDetail";

const PropertyDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  return <PropertyDetail id={id} />;
};

export default PropertyDetailPage;
