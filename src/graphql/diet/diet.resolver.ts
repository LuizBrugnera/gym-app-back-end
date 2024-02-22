import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { DietService } from "./diet.service";
import { CreateDietInput } from "./dto/create-diet.input";
import { UpdateDietInput } from "./dto/update-diet.input";
import { DietObject } from "./object/diet.object";
import { DeleteObject } from "../../common/objects/delete.object";

@Resolver(() => DietObject)
export class DietResolver {
  constructor(private readonly dietService: DietService) {}

  @Mutation(() => DietObject)
  createDiet(@Args("createDietInput") createDietInput: CreateDietInput) {
    return this.dietService.create(createDietInput);
  }

  @Query(() => [DietObject], { name: "diets" })
  findAll() {
    return this.dietService.findAll();
  }

  @Query(() => DietObject, { name: "dietById" })
  findOne(@Args("id") id: string) {
    return this.dietService.findOneById(id);
  }

  @Mutation(() => DietObject)
  updateDiet(@Args("updateDietInput") updateDietInput: UpdateDietInput) {
    return this.dietService.update(updateDietInput.id, updateDietInput);
  }

  @Mutation(() => DeleteObject)
  removeDiet(@Args("id") id: string) {
    return this.dietService.remove(id);
  }
}
