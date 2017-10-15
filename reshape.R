# Reshape data

library(tidyverse)
library(stringr)
library(reshape2)
library(jsonlite)

# Generate filenames
years <- 2013:2021
fileNames <- str_c("data/", years, ".csv")

fullData = tibble()

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
    
    # Construct a key for the name
    mutate(namekey = str_to_lower(name)) %>%
    mutate(namekey = str_replace_all(namekey, "[[:punct:]]", "")) %>% # Remove punctuation
    mutate(namekey = str_replace_all(namekey, " ", "")) %>%
    
    # The Big Sib
    mutate(bigsib = value) %>%
    
    # Construct keys for bigsibs
    mutate(bigsibkey = str_to_lower(bigsib)) %>%
    mutate(bigsibkey = str_replace_all(bigsibkey, "[[:punct:]]", "")) %>% # Remove punctuation
    mutate(bigsibkey = str_replace_all(bigsibkey, " ", "")) %>%
    
    # Change the variable name to lowercase
    mutate(year = Year) %>%
    
    # Throw away unnecessary columns
    select(-Year, -value, -variable)
  
  fullData <- rbind(fullData, df) 
}

# Write a .json
write_json(fullData, "fullData.json")


