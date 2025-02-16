# # Most accurate 17/20
# from fastapi import FastAPI
# from pydantic import BaseModel
# from transformers import pipeline

# # Initialize FastAPI
# app = FastAPI()

# # Load the zero-shot classification model
# classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")

# # Define request body
# class ClassificationRequest(BaseModel):
#     text: str
#     labels: list[str]

# @app.post("/classify/")
# async def classify_text(request: ClassificationRequest):
#     # labels = ["billing", "service", "technical"]
#     labels = request.labels
#     hypothesis_template = 'This text is about {}.'

#     sequence = request.text

#     prediction = classifier(sequence, labels, hypothesis_template=hypothesis_template, multi_class=True)

#     # Return prediction in shape of [ 'category' ]
#     return {prediction["labels"][0]}


from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from transformers import pipeline, Pipeline
from typing import List

# Initialize FastAPI
app = FastAPI()

# Load the zero-shot classification model
try:
    classifier: Pipeline = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")
except Exception as e:
    raise RuntimeError(f"Failed to load model: {str(e)}")

# Define request body
class ClassificationRequest(BaseModel):
    text: str = Field(..., example="I need help with my internet connection.")
    labels: List[str] = Field(..., example=["billing", "service", "technical"])

# Define response model
class ClassificationResponse(BaseModel):
    category: str

@app.post("/classify/", response_model=ClassificationResponse)
async def classify_text(request: ClassificationRequest):
    try:
        if not request.labels:
            raise HTTPException(status_code=400, detail="Labels cannot be empty")

        hypothesis_template = "This text is about {}."
        sequence = request.text

        # Perform classification
        prediction = classifier(sequence, request.labels, hypothesis_template=hypothesis_template, multi_class=True)

        # Return top prediction
        return ClassificationResponse(category=prediction["labels"][0])

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")




# Try validation

# from fastapi import FastAPI, HTTPException
# from pydantic import BaseModel, Field, validator
# from transformers import pipeline, Pipeline
# from typing import List
# import torch

# # Initialize FastAPI
# app = FastAPI()

# # Try to load the zero-shot classification model
# from fastapi import FastAPI, HTTPException
# from pydantic import BaseModel, Field, field_validator
# from transformers import pipeline, Pipeline
# from typing import List, Dict
# import torch

# # Initialize FastAPI
# app = FastAPI()

# Try to load the zero-shot classification model
# try:
#     device = 0 if torch.cuda.is_available() else -1  # Use GPU if available
#     classifier: Pipeline = pipeline(
#         "zero-shot-classification",
#         model="facebook/bart-large-mnli",
#         device=device
#     )
# except Exception as e:
#     raise RuntimeError(f"Failed to load model: {str(e)}")

# # Define request model with validation
# class ClassificationRequest(BaseModel):
#     text: str = Field(..., example="I need help with my internet connection.")
#     labels: List[str] = Field(..., example=["billing", "service", "technical"])

#     @field_validator("text")
#     @classmethod
#     def validate_text(cls, value: str) -> str:
#         """Ensure the text is not empty and not too long."""
#         if not value.strip():
#             raise ValueError("Text cannot be empty or just whitespace.")
#         if len(value) > 1000:  # Limit to 1000 characters
#             raise ValueError("Text is too long. Please limit it to 1000 characters.")
#         return value

#     @field_validator("labels")
#     @classmethod
#     def validate_labels(cls, value: List[str]) -> List[str]:
#         """Ensure labels are a non-empty list of strings."""
#         if not value or not all(isinstance(label, str) and label.strip() for label in value):
#             raise ValueError("Labels must be a non-empty list of non-empty strings.")
#         return value

# # Define response model
# class ClassificationResponse(BaseModel):
#     category: str
#     scores: Dict[str, float]  # Returns scores for all labels

# @app.post("/classify/", response_model=ClassificationResponse)
# async def classify_text(request: ClassificationRequest):
#     try:
#         # Ensure at least one label exists
#         if not request.labels:
#             raise HTTPException(status_code=400, detail="Labels cannot be empty.")

#         hypothesis_template = "This text is about {}."
#         sequence = request.text

#         # Perform classification
#         prediction = classifier(sequence, request.labels, hypothesis_template=hypothesis_template, multi_class=True)

#         if not prediction["labels"]:
#             raise HTTPException(status_code=500, detail="No classification labels returned.")

#         # Construct response
#         top_label = prediction["labels"][0]
#         scores = {label: round(score, 4) for label, score in zip(prediction["labels"], prediction["scores"])}

#         return ClassificationResponse(category=top_label, scores=scores)

#     except ValueError as ve:
#         raise HTTPException(status_code=400, detail=str(ve))
#     except IndexError:
#         raise HTTPException(status_code=500, detail="No valid classification result. Check input text and labels.")
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")
