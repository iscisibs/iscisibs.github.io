# Reshape data

library(tidyverse)
library(reshape2)

# Generate filenames
years <- 2013:2021
fileNames <- str_c("data/", years, ".csv")
  
for (i in seq_along(fileNames)) {
  # Read data
  df <- read_csv(fileNames[i])

  # Combine names
  df <- df %>% 
    unite("name", c("First Name", "Last Name"), sep = " ") %>%
    unite("big1", c("BigSib1First", "BigSib1Last"), sep = " ") %>%
    unite("big2", c("BigSib2First", "BigSib2Last"), sep = " ") %>%
    unite("big3", c("BigSib3First", "BigSib3Last"), sep = " ") %>%
    unite("big4", c("BigSib4First", "BigSib4Last"), sep = " ") %>%
    melt(id.vars = c("Year", "name")) %>% # Make data long
    filter(value != "NA NA") %>% # Remove NA values created by unite()
    select(-variable) # Remove redundant column

  # Write .csv long version
  write_csv(df, str_c("data/", years[i], "_long.csv"))
}

