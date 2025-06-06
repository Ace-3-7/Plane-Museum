package org.example.planemuseumbackend.Dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.example.planemuseumbackend.Entities.Plane;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PlaneDTO {
    private String manufacturer;
    private String name;
    private String type;
    private int yearOfManufacture;
    private String countryOfOrigin;
    private String description;
    private String imageUrl;
}
